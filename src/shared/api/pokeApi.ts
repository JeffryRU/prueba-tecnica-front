import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/shared/config/env'

/**
 * API base de PokeAPI (solo lectura).
 * Cada feature inyecta sus endpoints con `pokeApi.injectEndpoints`.
 */
export const pokeApi = createApi({
  reducerPath: 'pokeApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.pokeApiUrl }),
  endpoints: () => ({}),
})
