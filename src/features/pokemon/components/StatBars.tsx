import type { PokemonStat } from '../types/pokemon'
import { MAX_BASE_STAT, STAT_LABELS } from '../utils/pokemon'

function barColor(value: number) {
  if (value >= 120) return 'bg-emerald-500'
  if (value >= 80) return 'bg-lime-500'
  if (value >= 50) return 'bg-amber-400'
  return 'bg-orange-500'
}

export function StatBars({ stats }: { stats: PokemonStat[] }) {
  const total = stats.reduce((sum, stat) => sum + stat.value, 0)

  return (
    <dl className="space-y-3">
      {stats.map(({ name, value }) => (
        <div key={name} className="grid grid-cols-[7rem_2.5rem_1fr] items-center gap-3 text-sm">
          <dt className="text-slate-600">{STAT_LABELS[name] ?? name}</dt>
          <dd className="text-right font-semibold tabular-nums">{value}</dd>
          <dd
            className="h-2.5 overflow-hidden rounded-full bg-slate-100"
            role="meter"
            aria-label={STAT_LABELS[name] ?? name}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={MAX_BASE_STAT}
          >
            <div
              className={`h-full origin-left rounded-full transition-[width] duration-700 ${barColor(value)}`}
              style={{ width: `${(value / MAX_BASE_STAT) * 100}%` }}
            />
          </dd>
        </div>
      ))}
      <div className="grid grid-cols-[7rem_2.5rem_1fr] items-center gap-3 border-t border-slate-100 pt-3 text-sm">
        <dt className="font-semibold">Total</dt>
        <dd className="text-right font-bold tabular-nums">{total}</dd>
      </div>
    </dl>
  )
}
