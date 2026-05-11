import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000'
})

export const getMovies = () => API.get('/api/movies')
export const getMovieById = (id) => API.get(`/api/movies/${id}`)
export const createBooking = (data) => API.post('/api/bookings', data)
export const checkIn = (qrToken) => API.post('/api/bookings/checkin', { qrToken })
export const getStats = () => API.get('/api/bookings/stats')