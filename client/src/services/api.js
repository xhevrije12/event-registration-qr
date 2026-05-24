import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// --- AUTH FUNCTIONS ---
export const login = (credentials) => API.post('/api/auth/login', credentials)
export const register = (userData) => API.post('/api/auth/register', userData)
export const staffLogin = (code) => API.post('/api/auth/staff-login', { code })

// --- MOVIE & BOOKING FUNCTIONS ---
export const getMovies = () => API.get('/api/movies')
export const getMovieById = (id) => API.get(`/api/movies/${id}`)
export const createBooking = (data) => API.post('/api/bookings', data)
export const checkIn = (qrToken) => API.post('/api/bookings/checkin', { qrToken })
export const getStats = () => API.get('/api/bookings/stats')