/* eslint-disable */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
      } catch (_err) {
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="text-yellow-400 text-2xl animate-pulse">Duke ngarkuar...</div>
    </div>
  )

  if (!movie) return null

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Posteri */}
        <div className="md:w-1/3">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl"
            onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'}
          />
        </div>

        {/* Detajet */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-yellow-400 mb-3">{movie.title}</h1>

          <div className="flex gap-4 mb-4">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
              {movie.genre}
            </span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
              ⏱ {movie.duration} min
            </span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
              💺 {movie.availableSeats} vende
            </span>
          </div>

          <p className="text-gray-300 text-lg mb-6">{movie.description}</p>

          {/* Oraret */}
          <h3 className="text-xl font-bold text-white mb-3">🕐 Oraret e Shfaqjeve:</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {movie.showtimes.map((time, index) => (
              <span key={index} className="bg-gray-800 border border-yellow-500 text-yellow-400 px-4 py-2 rounded-lg text-sm">
                {new Date(time).toLocaleDateString('sq-AL', {
                  day: '2-digit', month: 'short'
                })} — {new Date(time).toLocaleTimeString('sq-AL', {
                  hour: '2-digit', minute: '2-digit'
                })}
              </span>
            ))}
          </div>

          {/* Çmimi dhe Butoni */}
          <div className="flex items-center gap-6">
            <span className="text-3xl font-bold text-yellow-400">{movie.price}€</span>
            <button
              onClick={() => navigate(`/book/${movie._id}`)}
              className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
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