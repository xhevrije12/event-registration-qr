import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function StaffRoute({ children }) {
  const { isStaff } = useAuth()

  if (!isStaff) {
    return <Navigate to="/staff-login" replace />
  }

  return children
}

export default StaffRoute