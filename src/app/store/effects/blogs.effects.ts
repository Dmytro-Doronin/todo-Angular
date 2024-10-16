import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'
import { catchError, concatMap, delay, map, mergeMap, switchMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import {
  addBlogsAction,
  addBlogsToStateAction,
  loadBlogs,
  setAllBlogsToState,
  setBlogsLoadingAction,
  successUpdateBlog,
  successUpdateDetailsBlog,
  updateBlog,
} from '../actions/blogs.actions'
import { BlogService } from '../../core/services/blog.service'
import { addAuthAlert, deleteAuthAlert } from '../actions/auth.actions'
import { BlogResponse } from '../../types/blogs.models'

@Injectable()
export class BlogsEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router
  ) {}

  blogAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBlogsAction),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService
            .postBlog({
              name: action.name,
              description: action.description,
              websiteUrl: action.websiteUrl,
            })
            .pipe(
              mergeMap((response: any) => {
                return [
                  addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              }),
              catchError(error => {
                const message = error.error.errorsMessages[0].message
                return of(
                  setBlogsLoadingAction({ loading: false }),
                  addAuthAlert({ severity: 'error', message: message })
                )
              })
            )
        )
      )
    )
  )
  blogEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBlog),

      concatMap(action =>
        concat(
          // Включаем крутилку перед началом запроса
          of(setBlogsLoadingAction({ loading: true })),

          this.blogService
            .editBlog({
              name: action.name,
              description: action.description,
              websiteUrl: action.websiteUrl,
              blogId: action.blogId,
            })
            .pipe(
              switchMap(() =>
                this.blogService.getBlogById(action.blogId).pipe(
                  map((updatedBlog: any) => {
                    return successUpdateDetailsBlog({ blog: updatedBlog })
                  }),
                  catchError(error => {
                    const message = error.error.errorsMessages[0].message
                    return of(
                      setBlogsLoadingAction({ loading: false }),
                      addAuthAlert({ severity: 'error', message: message })
                    )
                  })
                )
              ),
              // Отключаем крутилку после завершения запроса
              switchMap(response => of(setBlogsLoadingAction({ loading: false }))),
              catchError(error => {
                const message = error.error.errorsMessages[0].message
                return of(
                  setBlogsLoadingAction({ loading: false }),
                  addAuthAlert({ severity: 'error', message: message })
                )
              })
            )
        )
      )
    )
  )
  // blogEdit$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateBlog),
  //     concatMap(action =>
  //       concat(
  //         of(setBlogsLoadingAction({ loading: true })),
  //         this.blogService
  //           .editBlog({
  //             name: action.name,
  //             description: action.description,
  //             websiteUrl: action.websiteUrl,
  //             blogId: action.blogId,
  //           })
  //           .pipe(
  //             mergeMap((response: any) => {
  //               return [
  //                 addAuthAlert({ severity: 'success', message: 'Blog has been changed!' }),
  //                 successUpdateBlog({ blogId: action.blogId }),
  //                 setBlogsLoadingAction({ loading: false }),
  //               ]
  //             }),
  //             catchError(error => {
  //               const message = error.error.errorsMessages[0].message
  //               return of(
  //                 setBlogsLoadingAction({ loading: false }),
  //                 addAuthAlert({ severity: 'error', message: message })
  //               )
  //             })
  //           )
  //       )
  //     )
  //   )
  // )
  //
  // getUpdatedBlog$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(successUpdateBlog),
  //     concatMap(action =>
  //       concat(
  //         of(setBlogsLoadingAction({ loading: true })),
  //         this.blogService.getBlogById(action.blogId).pipe(
  //           mergeMap((response: any) => {
  //             return [
  //               // addAuthAlert({ severity: 'success', message: 'Blog has been changed!' }),
  //               // successUpdateBlog({ blogId: action.blogId }),
  //               setBlogsLoadingAction({ loading: false }),
  //             ]
  //           }),
  //           catchError(error => {
  //             const message = error.error.errorsMessages[0].message
  //             return of(
  //               setBlogsLoadingAction({ loading: false }),
  //               addAuthAlert({ severity: 'error', message: message })
  //             )
  //           })
  //         )
  //       )
  //     )
  //   )
  // )

  getAllBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogs),
      concatMap(action =>
        concat(
          of(setBlogsLoadingAction({ loading: true })),
          this.blogService.getBlogs(action.params).pipe(
            mergeMap((response: BlogResponse) => {
              if (action.params.pageNumber === 1) {
                return [
                  setAllBlogsToState({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    blogs: response.items,
                    hasMoreBlogs: response.items.length === action.params.pageSize,
                  }),
                  // addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              } else {
                return [
                  addBlogsToStateAction({
                    pagesCount: response.pagesCount,
                    page: response.page,
                    pageSize: response.pageSize,
                    totalCount: response.totalCount,
                    blogs: response.items,
                    hasMoreBlogs: response.items.length === action.params.pageSize,
                  }),
                  // addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
                  setBlogsLoadingAction({ loading: false }),
                ]
              }
            }),
            catchError(error => {
              const message = error.error.errorsMessages[0].message
              return of(
                setBlogsLoadingAction({ loading: false }),
                addAuthAlert({ severity: 'error', message: message })
              )
            })
          )
        )
      )
    )
  )

  clearAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAuthAlert),
      delay(5000),
      map(() => deleteAuthAlert())
    )
  )
}