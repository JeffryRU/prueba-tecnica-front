import type { PostsState } from '../store/postsSlice'
import type { Post, PostFilters, PostsPage } from '../types/post'

export function matchesFilters(post: Post, { userId, q }: Omit<PostFilters, 'page'>): boolean {
  if (userId && post.userId !== userId) return false
  if (!q) return true
  const term = q.trim().toLowerCase()
  return `${post.title} ${post.body}`.toLowerCase().includes(term)
}

/**
 * Combina una página del servidor con los cambios locales:
 * - los posts creados en la app aparecen al inicio de la primera página;
 * - se aplican las ediciones y se quitan los eliminados;
 * - el total se ajusta con los creados y eliminados que cumplen los filtros.
 */
export function mergePostsPage(
  server: PostsPage,
  local: Pick<PostsState, 'created' | 'updated' | 'deleted'>,
  filters: PostFilters,
): PostsPage {
  const created = local.created.filter((post) => matchesFilters(post, filters))
  const deleted = Object.values(local.deleted).filter((post) => matchesFilters(post, filters))

  const serverItems = server.items
    .filter((post) => !local.deleted[post.id])
    .map((post) => local.updated[post.id] ?? post)

  return {
    items: filters.page === 1 ? [...created, ...serverItems] : serverItems,
    total: Math.max(0, server.total + created.length - deleted.length),
  }
}
