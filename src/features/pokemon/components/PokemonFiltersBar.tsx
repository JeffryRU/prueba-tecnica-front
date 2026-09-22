import type { PokemonTypeName } from '../types/pokemon'
import { POKEMON_TYPES } from '../utils/pokemon'
import type { PokemonFilters } from '../hooks/usePokemonSearch'

type Props = {
  filters: PokemonFilters
  onChange: (filters: PokemonFilters) => void
}

const fieldClass =
  'h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100'

export function PokemonFiltersBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row" role="search">
      <label className="relative flex-1">
        <span className="sr-only">Buscar Pokémon por nombre o número</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="Buscar por nombre o número…"
          className={`${fieldClass} w-full pl-10`}
        />
      </label>
      <label>
        <span className="sr-only">Filtrar por tipo</span>
        <select
          value={filters.type}
          onChange={(event) => onChange({ ...filters, type: event.target.value })}
          className={`${fieldClass} w-full sm:w-48`}
        >
          <option value="">Todos los tipos</option>
          {(Object.keys(POKEMON_TYPES) as PokemonTypeName[]).map((type) => (
            <option key={type} value={type}>
              {POKEMON_TYPES[type].label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
