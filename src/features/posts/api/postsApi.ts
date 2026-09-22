import { jsonPlaceholderApi } from '@/shared/api/jsonPlaceholderApi'
import type { PostInput } from '../schemas/postSchema'
import type { Post, User } from '../types/post'

export const postsApi = jsonPlaceholderApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
      keepUnusedDataFor: 60 * 60,
    }),

    createPost: build.mutation<Post, PostInput>({
      query: (post) => ({ url: 'posts', method: 'POST', body: post }),
    }),
  }),
})

export const { useGetUsersQuery, useCreatePostMutation } = postsApi
