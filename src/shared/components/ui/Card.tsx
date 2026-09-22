import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type CardProps = { title?: string; children: ReactNode; className?: string }

export function Card({ title, children, className }: CardProps) {
  return (
    <section
      className={cn('rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6', className)}
    >
      {title && <h2 className="mb-4 text-lg font-bold">{title}</h2>}
      {children}
    </section>
  )
}
