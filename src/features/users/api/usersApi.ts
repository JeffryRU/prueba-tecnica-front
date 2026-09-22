import { jsonPlaceholderApi } from '@/shared/api/jsonPlaceholderApi'
import type { User } from '../types'

export const usersApi = jsonPlaceholderApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
      keepUnusedDataFor: 60 * 60,
    }),
  }),
})

export const { useGetUsersQuery } = usersApi

/** Un usuario concreto a partir de la lista cacheada (una sola petición para todos). */
export function useUser(userId: number | undefined) {
  return useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.find((user) => user.id === userId),
      isLoading,
    }),
  })
}
