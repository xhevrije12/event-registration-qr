import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getMovies = () => API.get('/api/movies')
export const getMovieById = (id) => API.get(`/api/movies/${id}`)
export const createBooking = (data) => API.post('/api/bookings', data)
export const checkIn = (qrToken) => API.post('/api/bookings/checkin', { qrToken })
export const getStats = () => API.get('/api/bookings/stats')
export const register = (data) => API.post('/api/auth/register', data)
export const login = (data) => API.post('/api/auth/login', data)
export const staffLogin = (code) => API.post('/api/auth/staff-login', { code })