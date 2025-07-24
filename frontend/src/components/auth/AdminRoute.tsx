import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface AdminRouteProps {
  children: ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-pinterest-red border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Checking permissions...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  // Check if user is admin (you would implement this based on your user model)
  const isAdmin = user?.email === 'admin@prakriti.com' // Temporary check
  
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AdminRoute