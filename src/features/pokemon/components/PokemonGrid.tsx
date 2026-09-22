import type { PokemonSummary } from '../types/pokemon'
import { PokemonCard, PokemonCardSkeleton } from './PokemonCard'

const gridClass = 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'

export function PokemonGrid({ pokemon }: { pokemon: PokemonSummary[] }) {
  return (
    <ul className={gridClass}>
      {pokemon.map((item) => (
        <li key={item.id}>
          <PokemonCard pokemon={item} />
        </li>
      ))}
    </ul>
  )
}

export function PokemonGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className={gridClass} aria-busy="true" aria-label="Cargando Pokémon">
      {Array.from({ length: count }, (_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  )
}
