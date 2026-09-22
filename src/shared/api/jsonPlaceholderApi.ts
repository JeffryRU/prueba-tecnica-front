import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/shared/config/env'

/**
 * API base de JSONPlaceholder (acepta mutations, pero no persiste los cambios).
 * Cada feature inyecta sus endpoints con `jsonPlaceholderApi.injectEndpoints`.
 */
export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.jsonPlaceholderApiUrl }),
  endpoints: () => ({}),
})
