/* eslint-disable */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
      } catch (_err) {
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

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
    } catch (_err) {
      alert('Gabim gjatë rezervimit! Provo përsëri.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="text-yellow-400 text-2xl animate-pulse">Duke ngarkuar...</div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-2">🎫 Rezervo Biletën</h1>
      <p className="text-gray-400 mb-8">{movie?.title}</p>

      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-8 border border-gray-800">

        {/* Emri */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm font-semibold mb-2 block">
            👤 Emri i Plotë
          </label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            placeholder="p.sh. Xhevrije Xhelili"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm font-semibold mb-2 block">
            📧 Email
          </label>
          <input
            type="email"
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            required
            placeholder="p.sh. xhevrije@email.com"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Showtime */}
        <div className="mb-5">
          <label className="text-gray-300 text-sm font-semibold mb-2 block">
            🕐 Zgjedh Orarin
          </label>
          <select
            name="showtime"
            value={form.showtime}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
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
          <label className="text-gray-300 text-sm font-semibold mb-2 block">
            💺 Numri i Vendeve
          </label>
          <select
            name="seats"
            value={form.seats}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
          >
            {[1,2,3,4,5,6].map(n => (
              <option key={n} value={n}>{n} vend{n > 1 ? 'e' : ''}</option>
            ))}
          </select>
        </div>

        {/* Totali */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex justify-between items-center">
          <span className="text-gray-300">Totali:</span>
          <span className="text-yellow-400 text-2xl font-bold">
            {(movie?.price * form.seats).toFixed(2)}€
          </span>
        </div>

        {/* Butoni */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {submitting ? '⏳ Duke procesuar...' : '✅ Konfirmo Rezervimin'}
        </button>
      </form>
    </div>
  )
}

export default BookingPage