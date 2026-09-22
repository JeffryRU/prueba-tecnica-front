import { Link, useParams } from 'react-router'
import { useGetPokemonQuery, useGetPokemonSpeciesQuery } from '@/features/pokemon/api/pokemonApi'
import { EvolutionChain } from '@/features/pokemon/components/EvolutionChain'
import { StatBars } from '@/features/pokemon/components/StatBars'
import { TypeBadge } from '@/features/pokemon/components/TypeBadge'
import {
  POKEMON_TYPES,
  formatHeight,
  formatName,
  formatPokemonNumber,
  formatWeight,
} from '@/features/pokemon/utils/pokemon'
import { BackLink } from '@/shared/components/ui/BackLink'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { StatusMessage } from '@/shared/components/ui/StatusMessage'
import { cn } from '@/shared/utils/cn'

export function PokemonDetailPage() {
  const { name = '' } = useParams()
  const { data: pokemon, isLoading, error, refetch } = useGetPokemonQuery(name.toLowerCase())
  const { data: species } = useGetPokemonSpeciesQuery(pokemon?.speciesId ?? 0, {
    skip: !pokemon,
  })

  if (isLoading) return <DetailSkeleton />

  if (error || !pokemon) {
    const notFound = error && 'status' in error && error.status === 404
    return (
      <StatusMessage
        tone={notFound ? 'neutral' : 'error'}
        title={
          notFound ? `No existe ningún Pokémon llamado "${name}"` : 'No pudimos cargar el Pokémon'
        }
        description={notFound ? 'Revisa el nombre o búscalo en la Pokédex.' : 'Inténtalo de nuevo.'}
        action={
          notFound ? (
            <Link to="/" className="text-brand-600 font-medium hover:underline">
              Ir a la Pokédex
            </Link>
          ) : (
            <Button onClick={refetch}>Reintentar</Button>
          )
        }
      />
    )
  }

  const mainType = POKEMON_TYPES[pokemon.types[0] ?? 'normal']
  const facts = [
    { label: 'Altura', value: formatHeight(pokemon.height) },
    { label: 'Peso', value: formatWeight(pokemon.weight) },
    { label: 'Exp. base', value: pokemon.baseExperience ?? '—' },
  ]

  return (
    <article className="animate-fade-in space-y-6">
      <BackLink fallback="/" label="Volver a la Pokédex" />

      <header
        className={cn(
          'grid items-center gap-6 overflow-hidden rounded-3xl p-6 sm:grid-cols-[auto_1fr] sm:p-8',
          mainType.softClassName,
        )}
      >
        <img
          src={pokemon.image}
          alt={formatName(pokemon.name)}
          className="mx-auto size-48 object-contain drop-shadow-xl sm:size-60"
        />
        <div className="space-y-3 text-center sm:text-left">
          <p className="font-mono text-sm font-semibold text-slate-500">
            {formatPokemonNumber(pokemon.id)}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {formatName(pokemon.name)}
          </h1>
          {species?.genus && <p className="text-slate-600">{species.genus}</p>}
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} size="md" />
            ))}
            {(species?.isLegendary || species?.isMythical) && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                {species.isMythical ? 'Mítico' : 'Legendario'}
              </span>
            )}
          </div>
          {species?.description && <p className="max-w-xl text-slate-700">{species.description}</p>}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <Card title="Datos">
            <dl className="grid grid-cols-3 gap-3 text-center">
              {facts.map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <dt className="text-xs text-slate-500">{label}</dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card title="Habilidades">
            <ul className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <li
                  key={ability.name}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium"
                >
                  {formatName(ability.name)}
                  {ability.hidden && <span className="ml-1 text-xs text-slate-500">(oculta)</span>}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <Card title="Estadísticas base">
          <StatBars stats={pokemon.stats} />
        </Card>
      </div>

      {species?.evolutionChainId && (
        <Card title="Cadena evolutiva">
          <EvolutionChain chainId={species.evolutionChainId} currentId={pokemon.id} />
        </Card>
      )}
    </article>
  )
}

function DetailSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Cargando Pokémon">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-72 w-full rounded-3xl" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    </div>
  )
}
