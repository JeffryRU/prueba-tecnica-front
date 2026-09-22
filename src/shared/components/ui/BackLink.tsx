import { Link, useLocation } from 'react-router'

/** Vuelve a la URL de origen (guardada en `location.state.from`) o a `fallback`. */
export function BackLink({ fallback, label }: { fallback: string; label: string }) {
  const { state } = useLocation() as { state: { from?: string } | null }

  return (
    <Link
      to={state?.from ?? fallback}
      className="hover:text-brand-600 inline-flex items-center gap-1 text-sm font-medium text-slate-600"
    >
      ← {label}
    </Link>
  )
}
