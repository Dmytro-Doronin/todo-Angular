import { createReducer, on } from '@ngrx/store'

import { IComment } from '../../types/comments.model'
import {
  addCommentsToStateAction,
  addSingleCommentToStateAction,
  changeLikeStatusForCommentInPostAction,
  setAllCommentsToState,
  setEditCommentAction,
  setEditLoadingForCommentsAction,
  setLoadingForCommentsAction,
  successDeleteCommentAction,
  successUpdateCommentAction,
} from '../actions/comments.action'
import { updatePostLikesStatusForComment } from '../../utils/comments.utils'
import { successDeletePost, successUpdateDetailsPost } from '../actions/posts.action'

export interface CommentsState {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  hasMoreComments: boolean
  editCommentId: string
  loading: boolean
  editLoading: boolean
  comments: IComment[]
}

export const initialState: CommentsState = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  hasMoreComments: false,
  loading: false,
  editLoading: false,
  editCommentId: '',
  comments: [],
}

export const commentsReducer = createReducer(
  initialState,
  on(
    setAllCommentsToState,
    (state, { comments, pagesCount, page, pageSize, totalCount, hasMoreComments }) => ({
      ...state,
      comments: comments,
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMoreComments: hasMoreComments,
    })
  ),
  on(
    addCommentsToStateAction,
    (state, { comments, pagesCount, page, pageSize, totalCount, hasMoreComments }) => ({
      ...state,
      comments: [...state.comments, ...comments],
      pagesCount: pagesCount,
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      hasMoreComments: hasMoreComments,
    })
  ),
  on(setLoadingForCommentsAction, (state, { loading }) => ({
    ...state,
    loading: loading,
  })),
  on(setEditLoadingForCommentsAction, (state, { editLoading }) => ({
    ...state,
    editLoading: editLoading,
  })),
  on(addSingleCommentToStateAction, (state, { comment }) => ({
    ...state,
    comments: [comment, ...state.comments],
  })),
  on(changeLikeStatusForCommentInPostAction, (state, { commentId, status }) => ({
    ...state,
    comments: state.comments.map(comment => {
      if (comment.id === commentId) {
        return updatePostLikesStatusForComment(comment, status)
      }
      return comment
    }),
  })),
  on(successDeleteCommentAction, (state, { commentId }) => ({
    ...state,
    comments: state.comments.filter(b => b.id !== commentId),
  })),
  on(setEditCommentAction, (state, { commentId }) => ({
    ...state,
    editCommentId: commentId,
  })),
  on(successUpdateCommentAction, (state, { comment }) => ({
    ...state,
    comments: state.comments.map(b => (b.id === comment.id ? comment : b)),
  }))
)
