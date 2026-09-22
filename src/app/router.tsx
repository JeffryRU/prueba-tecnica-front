import { createBrowserRouter } from 'react-router'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { PokedexPage } from '@/pages/pokedex/PokedexPage'
import { MainLayout } from '@/shared/layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <PokedexPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
