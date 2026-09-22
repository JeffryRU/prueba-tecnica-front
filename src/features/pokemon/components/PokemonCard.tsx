import { Link, useLocation } from 'react-router'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { useGetPokemonQuery } from '../api/pokemonApi'
import type { PokemonSummary } from '../types/pokemon'
import { artworkUrl, formatName, formatPokemonNumber } from '../utils/pokemon'
import { TypeBadge } from './TypeBadge'

export function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  // Cada tarjeta pide su detalle (tipos); RTK Query lo cachea y deduplica.
  const { data, isLoading } = useGetPokemonQuery(pokemon.name)
  const location = useLocation()

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      // Guarda la URL de la lista (con búsqueda y página) para el botón "Volver".
      state={{ from: location.pathname + location.search }}
      className="group animate-fade-in focus-visible:outline-brand-600 relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="self-end font-mono text-xs font-semibold text-slate-400">
        {formatPokemonNumber(pokemon.id)}
      </span>
      <div className="relative my-2 aspect-square w-full max-w-36">
        <div className="group-hover:bg-brand-50 absolute inset-4 rounded-full bg-slate-100 transition" />
        <img
          src={artworkUrl(pokemon.id)}
          alt={formatName(pokemon.name)}
          loading="lazy"
          width={144}
          height={144}
          className="relative size-full object-contain drop-shadow-md transition group-hover:scale-105"
        />
      </div>
      <h2 className="text-base font-bold">{formatName(pokemon.name)}</h2>
      <div className="mt-2 flex min-h-6 gap-1.5">
        {isLoading ? (
          <Skeleton className="h-5 w-16 rounded-full" />
        ) : (
          data?.types.map((type) => <TypeBadge key={type} type={type} />)
        )}
      </div>
    </Link>
  )
}

export function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <Skeleton className="h-3 w-12 self-end" />
      <Skeleton className="aspect-square w-full max-w-36 rounded-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  )
}
