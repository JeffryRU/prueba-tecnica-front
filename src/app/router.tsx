import { createBrowserRouter } from 'react-router'
import { HomePage } from '@/features/home/HomePage'
import { AppLayout } from '@/shared/components/layout/AppLayout'
import { NotFoundPage } from '@/shared/components/layout/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
