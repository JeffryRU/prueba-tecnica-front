import { skipToken } from '@reduxjs/toolkit/query'
import { useMemo } from 'react'
import { useGetPokemonIdsByTypeQuery, useGetPokemonIndexQuery } from '../api/pokemonApi'
import type { PokemonSummary } from '../types/pokemon'

export type PokemonFilters = { query: string; type: string }

/** Coincide por nombre ("pika") o por número ("25", "#025"). */
export function matchesQuery(pokemon: PokemonSummary, query: string): boolean {
  const term = query.trim().toLowerCase().replace(/^#/, '')
  if (!term) return true
  if (/^\d+$/.test(term)) return String(pokemon.id).includes(String(Number(term)))
  return pokemon.name.includes(term.replace(/\s+/g, '-'))
}

/** Combina el índice completo con el filtro por tipo y la búsqueda por texto. */
export function usePokemonSearch({ query, type }: PokemonFilters) {
  const index = useGetPokemonIndexQuery()
  const byType = useGetPokemonIdsByTypeQuery(type || skipToken)

  const results = useMemo(() => {
    const typeIds = type && byType.data ? new Set(byType.data) : null
    return (index.data ?? []).filter(
      (pokemon) => (!typeIds || typeIds.has(pokemon.id)) && matchesQuery(pokemon, query),
    )
  }, [index.data, byType.data, type, query])

  return {
    results,
    total: index.data?.length ?? 0,
    isLoading: index.isLoading || (Boolean(type) && byType.isFetching),
    isError: index.isError || byType.isError,
    retry: () => {
      index.refetch()
      if (type) byType.refetch()
    },
  }
}
