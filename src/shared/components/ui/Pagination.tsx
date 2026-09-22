import { cn } from '@/shared/utils/cn'
import { getPageItems } from '@/shared/utils/pagination'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const itemClass =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-40'

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Paginación" className="flex flex-wrap items-center justify-center gap-1">
      <button
        type="button"
        className={cn(itemClass, 'text-slate-600 hover:bg-slate-100')}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
      >
        ‹ Anterior
      </button>

      {getPageItems(page, totalPages).map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`e${index}`} className="px-1 text-slate-400" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              itemClass,
              item === page
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100',
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={cn(itemClass, 'text-slate-600 hover:bg-slate-100')}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
      >
        Siguiente ›
      </button>
    </nav>
  )
}
