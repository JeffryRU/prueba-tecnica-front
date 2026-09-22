import { useState } from 'react'
import { PokemonFiltersBar } from '@/features/pokemon/components/PokemonFiltersBar'
import { PokemonGrid, PokemonGridSkeleton } from '@/features/pokemon/components/PokemonGrid'
import { usePokemonSearch, type PokemonFilters } from '@/features/pokemon/hooks/usePokemonSearch'
import { Button } from '@/shared/components/ui/Button'
import { StatusMessage } from '@/shared/components/ui/StatusMessage'
import { useDebounce } from '@/shared/hooks/useDebounce'

const PAGE_SIZE = 24

export function PokedexPage() {
  const [filters, setFilters] = useState<PokemonFilters>({ query: '', type: '' })
  const [visible, setVisible] = useState(PAGE_SIZE)
  const query = useDebounce(filters.query)
  const { results, total, isLoading, isError, retry } = usePokemonSearch({ ...filters, query })

  const changeFilters = (next: PokemonFilters) => {
    setFilters(next)
    setVisible(PAGE_SIZE)
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Pokédex</h1>
        <p className="text-slate-600">
          Explora los {total || 'más de mil'} Pokémon de la Pokédex nacional. Busca por nombre o
          número y filtra por tipo.
        </p>
      </header>

      <PokemonFiltersBar filters={filters} onChange={changeFilters} />

      {isError ? (
        <StatusMessage
          tone="error"
          title="No pudimos cargar la Pokédex"
          description="Revisa tu conexión e inténtalo de nuevo."
          action={<Button onClick={retry}>Reintentar</Button>}
        />
      ) : isLoading ? (
        <PokemonGridSkeleton />
      ) : results.length === 0 ? (
        <StatusMessage
          title="Ningún Pokémon coincide"
          description="Prueba con otro nombre, número o tipo."
          action={
            <Button variant="secondary" onClick={() => changeFilters({ query: '', type: '' })}>
              Limpiar filtros
            </Button>
          }
        />
      ) : (
        <>
          <p className="text-sm text-slate-500" aria-live="polite">
            Mostrando {Math.min(visible, results.length)} de {results.length} Pokémon
          </p>
          <PokemonGrid pokemon={results.slice(0, visible)} />
          {visible < results.length && (
            <div className="flex justify-center">
              <Button variant="secondary" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                Mostrar más
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
