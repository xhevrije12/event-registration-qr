import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-yellow-500 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          🎬 CineCloud
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-300 hover:text-yellow-400 transition">
            Filmat
          </Link>
          <Link to="/checkin" className="bg-yellow-500 text-black px-4 py-1 rounded-full font-semibold hover:bg-yellow-400 transition">
            Staff Check-in
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar