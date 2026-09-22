import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiErrorListener } from '@/features/notifications/store/apiErrorListener'
import notificationsSlice from '@/features/notifications/store/notificationsSlice'
import postsSlice, { initialPostsState, type PostsState } from '@/features/posts/store/postsSlice'
import { jsonPlaceholderApi } from '@/shared/api/jsonPlaceholderApi'
import { pokeApi } from '@/shared/api/pokeApi'
import { loadJson, saveJson } from '@/shared/utils/storage'

const POSTS_STORAGE_KEY = 'pokehub:posts'

const rootReducer = combineSlices(pokeApi, jsonPlaceholderApi, postsSlice, notificationsSlice)

export const store = configureStore({
  reducer: rootReducer,
  // Los cambios locales de posts sobreviven a recargas (JSONPlaceholder no persiste).
  preloadedState: {
    posts: { ...initialPostsState, ...loadJson<PostsState>(POSTS_STORAGE_KEY) },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(apiErrorListener.middleware)
      .concat(pokeApi.middleware, jsonPlaceholderApi.middleware),
})

let savedPosts = store.getState().posts
store.subscribe(() => {
  const { posts } = store.getState()
  if (posts !== savedPosts) {
    savedPosts = posts
    saveJson(POSTS_STORAGE_KEY, posts)
  }
})

// Habilita refetchOnFocus / refetchOnReconnect
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
