import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import Login from '../pages/Login/Login'
import Users from '../pages/Users/Users'
import NotFound from '../pages/NotFound/NotFound'
import { MainLayout } from '../layouts/MainLayout'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '',
        element: <Navigate to="/users" replace />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
} 