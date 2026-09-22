import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { isPokemonType } from '../utils/pokemon'

export type PokedexParams = { query: string; type: string; page: number }

/**
 * Estado de la Pokédex guardado en la URL (?q=&type=&page=), de modo que la búsqueda,
 * el filtro y la página se conservan al recargar, compartir el enlace o volver atrás.
 */
export function usePokedexParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo<PokedexParams>(() => {
    const type = searchParams.get('type') ?? ''
    const page = Number(searchParams.get('page'))
    return {
      query: searchParams.get('q') ?? '',
      type: isPokemonType(type) ? type : '',
      page: Number.isInteger(page) && page > 0 ? page : 1,
    }
  }, [searchParams])

  const update = useCallback(
    (changes: Partial<PokedexParams>) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)
          const set = (key: string, value: string) =>
            value ? next.set(key, value) : next.delete(key)

          if (changes.query !== undefined) set('q', changes.query)
          if (changes.type !== undefined) set('type', changes.type)
          // Cambiar la búsqueda o el filtro vuelve a la primera página.
          const page = changes.page ?? 1
          set('page', page > 1 ? String(page) : '')
          return next
        },
        // La búsqueda al escribir no debe llenar el historial.
        { replace: changes.page === undefined },
      )
    },
    [setSearchParams],
  )

  return [params, update] as const
}
