import { Navigate } from 'react-router' 
import { useAuthStore } from '@/store/authStore'
import { Role } from '@/types/auth.types'

interface ProtectedRouteProps {
  children: JSX.Element
  requiredRoles?: Role []
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  const hasPermission = requiredRoles
    ? requiredRoles.includes(user?.role as Role)
    : true

  return isAuthenticated && hasPermission ? children : <Navigate to="/" />
}

export default ProtectedRoute