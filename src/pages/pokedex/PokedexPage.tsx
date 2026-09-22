import { PokemonFiltersBar } from '@/features/pokemon/components/PokemonFiltersBar'
import { PokemonGrid, PokemonGridSkeleton } from '@/features/pokemon/components/PokemonGrid'
import { usePokedexParams } from '@/features/pokemon/hooks/usePokedexParams'
import { usePokemonSearch } from '@/features/pokemon/hooks/usePokemonSearch'
import { Button } from '@/shared/components/ui/Button'
import { Pagination } from '@/shared/components/ui/Pagination'
import { StatusMessage } from '@/shared/components/ui/StatusMessage'
import { useDebouncedSync } from '@/shared/hooks/useDebouncedSync'
import { clampPage } from '@/shared/utils/pagination'

const PAGE_SIZE = 24

export function PokedexPage() {
  const [params, updateParams] = usePokedexParams()
  // El texto se escribe en local y se lleva a la URL con debounce.
  const [queryInput, setQueryInput] = useDebouncedSync(params.q, (q) => updateParams({ q }))

  const { results, total, isLoading, isError, retry } = usePokemonSearch({
    query: params.q,
    type: params.type,
  })
  const totalPages = Math.ceil(results.length / PAGE_SIZE)
  const page = clampPage(params.page, totalPages)
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const changePage = (next: number) => {
    updateParams({ page: next })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => updateParams({ q: '', type: '' })

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Pokédex</h1>
        <p className="text-slate-600">
          Explora los {total || 'más de mil'} Pokémon de la Pokédex nacional. Busca por nombre o
          número, filtra por tipo y abre cualquiera para ver su ficha.
        </p>
      </header>

      <PokemonFiltersBar
        filters={{ query: queryInput, type: params.type }}
        onChange={({ query, type }) => {
          setQueryInput(query)
          if (type !== params.type) updateParams({ type })
        }}
      />

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
            <Button variant="secondary" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          }
        />
      ) : (
        <>
          <p className="text-sm text-slate-500" aria-live="polite">
            {results.length} Pokémon · página {page} de {totalPages}
          </p>
          <PokemonGrid pokemon={pageItems} />
          <Pagination page={page} totalPages={totalPages} onPageChange={changePage} />
        </>
      )}
    </section>
  )
}
