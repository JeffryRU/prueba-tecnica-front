import { parsePage, useUrlParams } from '@/shared/hooks/useUrlParams'
import { isPokemonType } from '../utils/pokemon'

export type PokedexParams = { q: string; type: string; page: number }

function parsePokedexParams(params: URLSearchParams): PokedexParams {
  const type = params.get('type') ?? ''
  return {
    q: params.get('q') ?? '',
    type: isPokemonType(type) ? type : '',
    page: parsePage(params),
  }
}

/**
 * Estado de la Pokédex en la URL (?q=&type=&page=): se conserva al recargar,
 * compartir el enlace o volver desde el detalle.
 */
export function usePokedexParams() {
  return useUrlParams(parsePokedexParams)
}
