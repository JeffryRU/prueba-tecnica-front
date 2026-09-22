import { cn } from '@/shared/utils/cn'
import type { PokemonTypeName } from '../types/pokemon'
import { POKEMON_TYPES } from '../utils/pokemon'

export function TypeBadge({ type, size = 'sm' }: { type: PokemonTypeName; size?: 'sm' | 'md' }) {
  const { label, className } = POKEMON_TYPES[type]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold text-white shadow-sm',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className,
      )}
    >
      {label}
    </span>
  )
}
