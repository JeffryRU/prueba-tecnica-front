import { NavLink, Outlet, useLocation } from 'react-router'
import { cn } from '@/shared/utils/cn'

/** `section`: prefijos de ruta que también marcan el enlace como activo. */
const navItems = [
  { to: '/', label: 'Pokédex', section: '/pokemon' },
  { to: '/posts/new', label: 'Nueva publicación' },
]

export function MainLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <NavLink to="/" className="text-lg font-bold tracking-tight">
            Poké<span className="text-brand-600">Hub</span>
          </NavLink>
          <nav className="flex gap-1">
            {navItems.map(({ to, label, section }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive || (section && pathname.startsWith(section))
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Prueba técnica · Frontend Developer
      </footer>
    </div>
  )
}
