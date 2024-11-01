import { IExtendedLikesInfo } from './likes.model'

export interface PostQueryParams {
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  pageNumber?: number
  pageSize?: number
}

export interface IPost {
  id: string
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
  userId: string
  userName: string
  extendedLikesInfo: IExtendedLikesInfo
}
export interface PostResponse {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: IPost[]
}

export interface PostAddToBlogModel {
  title: string
  shortDescription: string
  content: string
  blogId: string
}

export interface EditPostModel {
  title: string
  shortDescription: string
  content: string
  postId: string
  blogId: string
}