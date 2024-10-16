import { createAction, props } from '@ngrx/store'
import { BlogQueryParams, IBlog, PostBlogModel } from '../../types/blogs.models'

export const addBlogsAction = createAction('[Add blog] add blog', props<PostBlogModel>())

export const loadBlogs = createAction(
  '[Get all blogs] het blogs',
  props<{ params: BlogQueryParams }>()
)
export const updateBlog = createAction(
  '[Blog] Update Blog',
  props<{
    blogId: string
    name: string
    description: string
    websiteUrl: string
  }>()
)

export const successUpdateBlog = createAction('[Blog] Update Blog', props<{ blogId: string }>())
export const successUpdateDetailsBlog = createAction(
  '[Blog] Update Blog details',
  props<{ blog: IBlog }>()
)

export const setAllBlogsToState = createAction(
  '[Set all blogs to state] set blogs',
  props<{
    blogs: IBlog[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMoreBlogs: boolean
  }>()
)

export const addBlogsToStateAction = createAction(
  '[Blogs] set all blogs at first load blogs',
  props<{
    blogs: IBlog[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMoreBlogs: boolean
  }>()
)

export const setBlogsLoadingAction = createAction(
  '[Set blog loading] set loading',
  props<{ loading: boolean }>()
)