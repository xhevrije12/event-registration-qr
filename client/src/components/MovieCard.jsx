import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500 transition-all duration-300 hover:scale-105">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-cover"
        onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{movie.genre} • {movie.duration} min</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{movie.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 font-bold text-lg">{movie.price}€</span>
          <Link
            to={`/movies/${movie._id}`}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Rezervo →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieCard