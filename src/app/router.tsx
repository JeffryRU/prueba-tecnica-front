import { createBrowserRouter } from 'react-router'
import { HomePage } from '@/pages/home/HomePage'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
