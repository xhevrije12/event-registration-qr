import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getMovieById } from '../services/api'

function MoviePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(id)
        setMovie(res.data)
      } catch {
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
 }, [id, navigate])

  if (loading) return <LoadingSpinner text="Duke ngarkuar filmin..." />
  if (!movie) return null

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 animate-fade-in">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-yellow-400 transition mb-6 flex items-center gap-2 text-sm group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Kthehu te Filmat
      </button>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Posteri */}
        <div className="md:w-1/3">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full object-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Detajet */}
        <div className="md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
            {movie.title}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded-full text-sm font-bold">
              🎭 {movie.genre}
            </span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
              ⏱ {movie.duration} min
            </span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
              💺 {movie.availableSeats} vende
            </span>
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-8">
            {movie.description}
          </p>

          {/* Oraret */}
          <div className="mb-8">
            <h3 className="text-white font-bold mb-3">🕐 Oraret e Shfaqjeve:</h3>
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.map((time, index) => (
                <span
                  key={index}
                  className="bg-gray-800 border border-yellow-500/30 hover:border-yellow-500 text-yellow-400 px-4 py-2 rounded-xl text-sm transition-all duration-200 cursor-default"
                >
                  {new Date(time).toLocaleDateString('sq-AL', {
                    day: '2-digit', month: 'short'
                  })} — {new Date(time).toLocaleTimeString('sq-AL', {
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              ))}
            </div>
          </div>

          {/* Çmimi + Butoni */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
            <div>
              <p className="text-gray-500 text-sm">Çmimi për vend</p>
              <p className="text-4xl font-bold text-yellow-400">{movie.price}€</p>
            </div>
            <button
              onClick={() => navigate(`/book/${movie._id}`)}
              className="flex-1 bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-500/30"
            >
              🎫 Rezervo Tani
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePage