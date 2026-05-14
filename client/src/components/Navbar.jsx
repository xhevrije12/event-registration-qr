import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const { isStaff, logoutStaff } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleStaffLogout = () => {
    logoutStaff()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-yellow-500/30 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          🎬 CineCloud
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              isActive('/')
                ? 'text-yellow-400 bg-yellow-400/10'
                : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
            }`}
          >
            🎥 Filmat
          </Link>

          <Link
            to="/admin"
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              isActive('/admin')
                ? 'text-yellow-400 bg-yellow-400/10'
                : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
            }`}
          >
            📊 Admin
          </Link>

          {/* Staff Section */}
          {isStaff ? (
            <div className="flex items-center gap-2">
              <Link
                to="/checkin"
                className="bg-yellow-500 text-black px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition-all duration-200"
              >
                📱 Check-in
              </Link>

              <button
                onClick={handleStaffLogout}
                className="bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-2 rounded-full text-sm font-semibold hover:bg-red-500/30 transition"
              >
                Dil 🚪
              </button>
            </div>
          ) : (
            <Link
              to="/staff-login"
              className="bg-gray-800 text-gray-300 px-5 py-2 rounded-full font-bold hover:bg-gray-700 transition-all duration-200"
            >
              🔐 Staff Login
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 hover:text-yellow-400 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            🎥 Filmat
          </Link>

          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 hover:text-yellow-400 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            📊 Admin
          </Link>

          {isStaff ? (
            <>
              <Link
                to="/checkin"
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-center"
              >
                📱 Check-in
              </Link>

              <button
                onClick={handleStaffLogout}
                className="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-full text-sm font-semibold"
              >
                Dil 🚪
              </button>
            </>
          ) : (
            <Link
              to="/staff-login"
              onClick={() => setMenuOpen(false)}
              className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full font-bold text-center"
            >
              🔐 Staff Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar