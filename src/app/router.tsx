import { createBrowserRouter } from 'react-router'
import { RouteErrorPage } from '@/pages/error/RouteErrorPage'
import { MainLayout } from '@/shared/layouts/MainLayout'

/**
 * Cada pantalla se carga bajo demanda (code splitting): el bundle inicial solo incluye el layout.
 * `errorElement` actúa como error boundary para cualquier ruta.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
    // Se muestra mientras se descarga la primera pantalla
    hydrateFallbackElement: (
      <div className="grid min-h-dvh place-items-center text-sm text-slate-500">Cargando…</div>
    ),
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/pokedex/PokedexPage').then((m) => ({ Component: m.PokedexPage })),
      },
      {
        path: 'pokemon/:name',
        lazy: () =>
          import('@/pages/pokemon-detail/PokemonDetailPage').then((m) => ({
            Component: m.PokemonDetailPage,
          })),
      },
      {
        path: 'posts',
        lazy: () => import('@/pages/posts/PostsPage').then((m) => ({ Component: m.PostsPage })),
      },
      {
        path: 'posts/new',
        lazy: () => import('@/pages/posts/NewPostPage').then((m) => ({ Component: m.NewPostPage })),
      },
      {
        path: 'posts/:id',
        lazy: () =>
          import('@/pages/posts/PostDetailPage').then((m) => ({ Component: m.PostDetailPage })),
      },
      {
        path: 'posts/:id/edit',
        lazy: () =>
          import('@/pages/posts/EditPostPage').then((m) => ({ Component: m.EditPostPage })),
      },
      {
        path: '*',
        lazy: () =>
          import('@/pages/not-found/NotFoundPage').then((m) => ({ Component: m.NotFoundPage })),
      },
    ],
  },
])
