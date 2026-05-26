import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://cinecloud-api.onrender.com'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('staffToken') || localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = (credentials) => API.post('/api/auth/login', credentials)
export const register = (userData) => API.post('/api/auth/register', userData)
export const staffLogin = (code) => API.post('/api/auth/staff-login', { code })
export const getMovies = () => API.get('/api/movies')
export const getMovieById = (id) => API.get(`/api/movies/${id}`)
export const createBooking = (data) => API.post('/api/bookings', data)
export const checkIn = (qrToken) => API.post('/api/bookings/checkin', { qrToken })
export const getStats = () => API.get('/api/bookings/stats')