import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Post } from '../types/post'

/** JSONPlaceholder tiene 100 posts; los ids mayores son de posts creados en la app. */
export const SERVER_POST_COUNT = 100

export const isLocalPost = (id: number) => id > SERVER_POST_COUNT

/**
 * JSONPlaceholder acepta POST/PUT/DELETE pero no persiste nada. Este slice guarda los cambios
 * confirmados por la API (creados, editados y eliminados) y se combina con los datos del servidor.
 */
export type PostsState = {
  created: Post[]
  updated: Record<number, Post>
  deleted: Record<number, Post>
  nextId: number
}

export const initialPostsState: PostsState = {
  created: [],
  updated: {},
  deleted: {},
  nextId: SERVER_POST_COUNT + 1,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    postCreated: (state, { payload }: PayloadAction<Post>) => {
      state.created.unshift(payload)
      state.nextId = Math.max(state.nextId, payload.id + 1)
    },
    postUpdated: (state, { payload }: PayloadAction<Post>) => {
      const index = state.created.findIndex((post) => post.id === payload.id)
      if (index >= 0) state.created[index] = payload
      else state.updated[payload.id] = payload
    },
    postDeleted: (state, { payload }: PayloadAction<Post>) => {
      if (isLocalPost(payload.id)) {
        state.created = state.created.filter((post) => post.id !== payload.id)
      } else {
        state.deleted[payload.id] = payload
        delete state.updated[payload.id]
      }
    },
    localChangesCleared: () => initialPostsState,
  },
  selectors: {
    selectPostsState: (state) => state,
    selectNextPostId: (state) => state.nextId,
  },
})

export const { postCreated, postUpdated, postDeleted, localChangesCleared } = postsSlice.actions
export const { selectPostsState, selectNextPostId } = postsSlice.selectors
export default postsSlice
