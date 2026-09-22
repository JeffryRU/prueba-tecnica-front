import { NavLink, Outlet, useLocation, useNavigation } from 'react-router'
import { Toaster } from '@/features/notifications/components/Toaster'
import { cn } from '@/shared/utils/cn'

/** `section`: prefijo de ruta que también marca el enlace como activo. */
const navItems = [
  { to: '/', label: 'Pokédex', section: '/pokemon' },
  { to: '/posts', label: 'Publicaciones', section: '/posts' },
]

export function MainLayout() {
  const { pathname } = useLocation()
  const isNavigating = useNavigation().state === 'loading'

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Barra de progreso mientras se carga la siguiente pantalla */}
      <div
        aria-hidden
        className={cn(
          'bg-brand-600 fixed inset-x-0 top-0 z-50 h-0.5 origin-left transition-transform duration-500',
          isNavigating ? 'scale-x-75' : 'scale-x-0',
        )}
      />

      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span
              aria-hidden
              className="relative size-6 rounded-full border-2 border-slate-900 bg-[linear-gradient(to_bottom,var(--color-brand-600)_50%,white_50%)] after:absolute after:inset-0 after:m-auto after:size-2 after:rounded-full after:border-2 after:border-slate-900 after:bg-white"
            />
            <span>
              Poké<span className="text-brand-600">Hub</span>
            </span>
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
                    isActive || pathname.startsWith(section)
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

      <main key={pathname} className="animate-fade-in mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Prueba técnica · Frontend Developer · Datos de PokeAPI y JSONPlaceholder
      </footer>

      <Toaster />
    </div>
  )
}
