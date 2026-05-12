import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getMovieById, createBooking } from '../services/api'

function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    showtime: '',
    seats: 1
  })

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
    // KETU U SHTUA 'navigate'
  }, [id, navigate]) 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await createBooking({
        movieId: movie._id,
        movieTitle: movie.title,
        showtime: form.showtime,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        seats: parseInt(form.seats)
      })
      navigate('/confirmation', { state: { booking: res.data } })
    } catch {
      alert('Gabim gjatë rezervimit! Provo përsëri.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner text="Duke ngarkuar filmin..." />

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-10 animate-fade-in">

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-yellow-400 transition mb-4 flex items-center gap-2 text-sm"
        >
          ← Kthehu
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
          🎫 Rezervo Biletën
        </h1>
        <p className="text-gray-400">{movie?.title}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">

        {/* Emri */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm font-semibold mb-2 block">👤 Emri i Plotë</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            placeholder="p.sh. Xhevrije Xhelili"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm font-semibold mb-2 block">📧 Email</label>
          <input
            type="email"
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            required
            placeholder="p.sh. xhevrije@email.com"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
          />
        </div>

        {/* Showtime */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm font-semibold mb-2 block">🕐 Zgjedh Orarin</label>
          <select
            name="showtime"
            value={form.showtime}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors duration-200"
          >
            <option value="">-- Zgjedh orarin --</option>
            {movie?.showtimes.map((time, index) => (
              <option key={index} value={time}>
                {new Date(time).toLocaleDateString('sq-AL', {
                  weekday: 'long', day: '2-digit', month: 'long'
                })} — {new Date(time).toLocaleTimeString('sq-AL', {
                  hour: '2-digit', minute: '2-digit'
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Vendet */}
        <div className="mb-8">
          <label className="text-gray-300 text-sm font-semibold mb-2 block">💺 Numri i Vendeve</label>
          <div className="flex gap-2">
            {[1,2,3,4,5,6].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setForm({ ...form, seats: n })}
                className={`flex-1 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  form.seats === n
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">Totali për {form.seats} vend{form.seats > 1 ? 'e' : ''}</p>
            <p className="text-gray-500 text-xs">{movie?.price}€ × {form.seats}</p>
          </div>
          <span className="text-yellow-400 text-3xl font-bold">
            {(movie?.price * form.seats).toFixed(2)}€
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Duke procesuar...
            </span>
          ) : '✅ Konfirmo Rezervimin'}
        </button>
      </form>
    </div>
  )
}

export default BookingPage    