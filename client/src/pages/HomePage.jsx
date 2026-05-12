import { useState, useEffect, useMemo } from 'react'
import HeroBanner from '../components/HeroBanner'
import NewsTicker from '../components/NewsTicker'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getMovies, getStats } from '../services/api'

const GENRES = ['Të gjithë', 'Action', 'Sci-Fi', 'Adventure', 'Drama']

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [search, setSearch] = useState('')
  const [activeGenre, setActiveGenre] = useState('Të gjithë')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, statsRes] = await Promise.all([getMovies(), getStats()])
        setMovies(moviesRes.data)
        setStats(statsRes.data)
      } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = useMemo(() => {
    let result = movies
    if (activeGenre !== 'Të gjithë') {
      result = result.filter(m => m.genre === activeGenre)
    }
    if (search) {
      result = result.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    return result
  }, [activeGenre, search, movies])

  if (loading) return <LoadingSpinner text="Duke ngarkuar filmat..." />

  return (
    <div>
      {/* Ticker */}
      <NewsTicker movies={movies} />

      {/* Hero Banner */}
      <HeroBanner />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">

        {/* Live Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { value: stats.total, label: 'Rezervime Totale', icon: '🎫', delay: 'stagger-1' },
              { value: stats.checkedIn, label: 'Kanë Hyrë', icon: '✅', delay: 'stagger-2' },
              { value: stats.active, label: 'Në Pritje', icon: '⏳', delay: 'stagger-3' },
              { value: `${stats.revenue}€`, label: 'Revenue', icon: '💰', delay: 'stagger-4' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`animate-fade-in ${stat.delay} bg-gray-900 border border-gray-800 rounded-xl p-4 text-center hover:border-yellow-500/50 transition-all duration-300`}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</div>
                <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Search + Filter */}
        <div className="mb-8 animate-fade-in stagger-2">
          <input
            type="text"
            placeholder="🔍 Kërko film..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl px-5 py-3 mb-4 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
          />
          <div className="flex flex-wrap gap-2">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  activeGenre === genre
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Nuk u gjet */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 animate-fade-in">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl">Nuk u gjet asnjë film!</p>
            <button
              onClick={() => { setSearch(''); setActiveGenre('Të gjithë') }}
              className="mt-4 text-yellow-400 hover:underline"
            >
              Pastro filtrat
            </button>
          </div>
        ) : (
          <>
            {/* Seksioni 1 — Tani në Ekran */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              🔥 Tani në Ekran
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {filtered.slice(0, 4).map((movie, index) => (
                <MovieCard key={movie._id} movie={movie} index={index} />
              ))}
            </div>

            {/* Seksioni 2 — Klasikët */}
            {filtered.length > 4 && (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                  🎬 Klasikët e Kinemasë
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                  {filtered.slice(4, 8).map((movie, index) => (
                    <MovieCard key={movie._id} movie={movie} index={index} />
                  ))}
                </div>
              </>
            )}

            {/* Seksioni 3 — Aksion & Aventurë */}
            {filtered.length > 8 && (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                  💥 Aksion & Aventurë
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {filtered.slice(8, 12).map((movie, index) => (
                    <MovieCard key={movie._id} movie={movie} index={index} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage