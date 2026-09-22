import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/shared/config/env'

/**
 * API base de Rick and Morty (solo lectura).
 * Cada feature inyecta sus endpoints con `rickAndMortyApi.injectEndpoints`.
 */
export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.rickAndMortyApiUrl }),
  endpoints: () => ({}),
})
