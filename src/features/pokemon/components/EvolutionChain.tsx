import { Fragment } from 'react'
import { Link } from 'react-router'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { cn } from '@/shared/utils/cn'
import { useGetEvolutionChainQuery } from '../api/pokemonApi'
import { artworkUrl, formatName, formatPokemonNumber } from '../utils/pokemon'

type Props = { chainId: number; currentId: number }

export function EvolutionChain({ chainId, currentId }: Props) {
  const { data: stages, isLoading, isError } = useGetEvolutionChainQuery(chainId)

  if (isLoading) return <Skeleton className="h-32 w-full rounded-xl" />
  if (isError || !stages) {
    return <p className="text-sm text-slate-500">No se pudo cargar la cadena evolutiva.</p>
  }
  if (stages.length === 1) {
    return <p className="text-sm text-slate-500">Este Pokémon no evoluciona.</p>
  }

  return (
    <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      {stages.map((stage, index) => (
        <Fragment key={stage.map((p) => p.id).join('-')}>
          {index > 0 && (
            <li aria-hidden className="text-2xl text-slate-300">
              →
            </li>
          )}
          <li className="flex flex-wrap justify-center gap-2">
            {stage.map((pokemon) => (
              <Link
                key={pokemon.id}
                to={`/pokemon/${pokemon.name}`}
                aria-current={pokemon.id === currentId ? 'page' : undefined}
                className={cn(
                  'flex w-24 flex-col items-center rounded-xl p-2 text-center transition hover:bg-slate-100',
                  pokemon.id === currentId && 'bg-brand-50 ring-brand-500 ring-2',
                )}
              >
                <img
                  src={artworkUrl(pokemon.id)}
                  alt=""
                  loading="lazy"
                  className="size-16 object-contain"
                />
                <span className="text-xs font-semibold">{formatName(pokemon.name)}</span>
                <span className="font-mono text-[10px] text-slate-400">
                  {formatPokemonNumber(pokemon.id)}
                </span>
              </Link>
            ))}
          </li>
        </Fragment>
      ))}
    </ol>
  )
}
