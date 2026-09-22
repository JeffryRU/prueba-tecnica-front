import { jsonPlaceholderApi } from '@/shared/api/jsonPlaceholderApi'
import type { PostInput } from '../schemas/postSchema'
import {
  isLocalPost,
  postCreated,
  postDeleted,
  postUpdated,
  type PostsState,
} from '../store/postsSlice'
import type { Comment, Post, PostFilters, PostsPage } from '../types/post'

export const POSTS_PAGE_SIZE = 10

/** Evita importar el tipo del store (dependencia circular): solo se necesita el slice de posts. */
const nextPostId = (getState: () => unknown) => (getState() as { posts: PostsState }).posts.nextId

export const postsApi = jsonPlaceholderApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostsPage, PostFilters>({
      query: ({ page, userId, q }) => ({
        url: 'posts',
        params: { _page: page, _limit: POSTS_PAGE_SIZE, userId, q: q || undefined },
      }),
      transformResponse: (items: Post[], meta) => ({
        items,
        total: Number(meta?.response?.headers.get('x-total-count') ?? items.length),
      }),
    }),

    getPost: build.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),

    getPostComments: build.query<Comment[], number>({
      query: (id) => `posts/${id}/comments`,
    }),

    /** La API siempre responde con id 101: se asigna un id local único para poder usarlo. */
    createPost: build.mutation<Post, PostInput>({
      async queryFn(input, { getState }, _options, baseQuery) {
        const result = await baseQuery({ url: 'posts', method: 'POST', body: input })
        if (result.error) return { error: result.error }
        return { data: { ...(result.data as Post), ...input, id: nextPostId(getState) } }
      },
      async onQueryStarted(_input, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }))
        if (data) dispatch(postCreated(data))
      },
    }),

    /** Los posts creados en la app no existen en el servidor (PUT daría 500): se editan en local. */
    updatePost: build.mutation<Post, Post>({
      async queryFn(post, _api, _options, baseQuery) {
        if (isLocalPost(post.id)) return { data: post }
        const result = await baseQuery({ url: `posts/${post.id}`, method: 'PUT', body: post })
        if (result.error) return { error: result.error }
        return { data: { ...(result.data as Post), ...post } }
      },
      async onQueryStarted(_post, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }))
        if (data) dispatch(postUpdated(data))
      },
    }),

    deletePost: build.mutation<null, Post>({
      async queryFn(post, _api, _options, baseQuery) {
        if (isLocalPost(post.id)) return { data: null }
        const result = await baseQuery({ url: `posts/${post.id}`, method: 'DELETE' })
        return result.error ? { error: result.error } : { data: null }
      },
      async onQueryStarted(post, { dispatch, queryFulfilled }) {
        const ok = await queryFulfilled.then(() => true).catch(() => false)
        if (ok) dispatch(postDeleted(post))
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostCommentsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi
