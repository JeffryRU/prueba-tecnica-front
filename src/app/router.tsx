import { createBrowserRouter } from 'react-router'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { PokedexPage } from '@/pages/pokedex/PokedexPage'
import { PokemonDetailPage } from '@/pages/pokemon-detail/PokemonDetailPage'
import { NewPostPage } from '@/pages/posts/NewPostPage'
import { MainLayout } from '@/shared/layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <PokedexPage /> },
      { path: 'pokemon/:name', element: <PokemonDetailPage /> },
      { path: 'posts/new', element: <NewPostPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
