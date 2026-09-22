import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type StatusMessageProps = {
  title: string
  description?: string
  tone?: 'neutral' | 'error'
  action?: ReactNode
}

/** Mensaje centrado para estados vacíos o de error. */
export function StatusMessage({
  title,
  description,
  tone = 'neutral',
  action,
}: StatusMessageProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center',
        tone === 'error' ? 'border-red-200 bg-red-50/60' : 'border-slate-300 bg-white',
      )}
    >
      <p className={cn('text-lg font-semibold', tone === 'error' && 'text-red-700')}>{title}</p>
      {description && <p className="max-w-md text-sm text-slate-600">{description}</p>}
      {action}
    </div>
  )
}
