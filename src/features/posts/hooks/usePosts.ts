import { useMemo } from 'react'
import { useAppSelector } from '@/app/hooks'
import { isNotFound } from '@/shared/api/errors'
import { useGetPostQuery, useGetPostsQuery } from '../api/postsApi'
import { isLocalPost, selectPostsState } from '../store/postsSlice'
import type { PostFilters } from '../types/post'
import { mergePostsPage } from '../utils/mergePosts'

/** Página de posts del servidor combinada con los cambios locales. */
export function usePosts(filters: PostFilters) {
  const local = useAppSelector(selectPostsState)
  const query = useGetPostsQuery(filters)

  const page = useMemo(
    () => (query.data ? mergePostsPage(query.data, local, filters) : undefined),
    [query.data, local, filters],
  )

  return { ...query, data: page }
}

/** Un post: local si se creó en la app, o del servidor con las ediciones locales aplicadas. */
export function usePost(id: number) {
  const local = useAppSelector(selectPostsState)
  const created = local.created.find((post) => post.id === id)
  const deleted = Boolean(local.deleted[id])
  const skip = isLocalPost(id) || deleted
  const query = useGetPostQuery(id, { skip })

  return {
    post: skip ? created : (local.updated[id] ?? query.data),
    isLoading: !skip && query.isLoading,
    isNotFound: deleted || (isLocalPost(id) && !created) || isNotFound(query.error),
    isError: !skip && query.isError,
    refetch: query.refetch,
  }
}
