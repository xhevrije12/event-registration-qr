/* eslint-disable */
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import { getMovies } from '../services/api'

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies()
        setMovies(res.data)
      } catch (_err) {
        setError('Nuk u ngarkuan filmat!')
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="text-yellow-400 text-2xl animate-pulse">🎬 Duke ngarkuar filmat...</div>
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center h-96">
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">🎬 CineCloud</h1>
        <p className="text-gray-400 text-xl">Rezervo biletat tuaja — hyrja me QR kod!</p>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">
        🎥 Filmat në Ekran
        <span className="text-gray-500 text-lg font-normal ml-3">({movies.length} filma)</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default HomePage