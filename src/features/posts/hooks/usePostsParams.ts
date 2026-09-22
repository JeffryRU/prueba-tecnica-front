import { parsePage, useUrlParams } from '@/shared/hooks/useUrlParams'

export type PostsParams = { page: number; userId: number; q: string }

function parsePostsParams(params: URLSearchParams): PostsParams {
  const userId = Number(params.get('userId'))
  return {
    page: parsePage(params),
    userId: Number.isInteger(userId) && userId > 0 ? userId : 0,
    q: params.get('q') ?? '',
  }
}

/** Filtros del listado de posts en la URL (?page=&userId=&q=). */
export function usePostsParams() {
  return useUrlParams(parsePostsParams)
}
