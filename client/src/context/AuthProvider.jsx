import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [isStaff, setIsStaff] = useState(
    () => !!localStorage.getItem('staffToken')
  )

  const loginUser = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setIsStaff(false)
  }

  const loginStaff = (token) => {
    localStorage.setItem('staffToken', token)
    setIsStaff(true)
    setUser(null)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const logoutStaff = () => {
    localStorage.removeItem('staffToken')
    setIsStaff(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isStaff,
      loginUser,
      loginStaff,
      logout,
      logoutStaff
    }}>
      {children}
    </AuthContext.Provider>
  )
}