import { Link } from 'react-router-dom'

function MovieCard({ movie, index = 0 }) {
  const isLowSeats = movie.availableSeats <= 20

  return (
    <div
      className={`animate-fade-in stagger-${Math.min(index + 1, 4)} bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 group`}
    >
      {/* Poster */}
      <div className="relative overflow-hidden h-72">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/300x450/111827/EAB308?text=${encodeURIComponent(movie.title)}`
          }}
        />

        {/* Genre Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full border border-yellow-500/30">
            {movie.genre}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 backdrop-blur-sm text-gray-300 text-xs px-2 py-1 rounded-full">
            ⏱ {movie.duration}min
          </span>
        </div>

        {/* 🔥 Vendet e Fundit Badge */}
        {isLowSeats && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
              🔥 Vetëm {movie.availableSeats} vende mbeten!
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{movie.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {movie.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 font-bold text-xl">{movie.price}€</span>
          <Link
            to={`/movies/${movie._id}`}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Rezervo →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieCard