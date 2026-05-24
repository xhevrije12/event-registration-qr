import axios from 'axios'

const API = axios.create({
  // Sigurohu që URL në .env përfundon me /api ose hiqe /api nga funksionet poshtë
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// Shto një Interceptor (Opsionale por e rekomanduar)
// Kjo ndihmon nëse ke nevojë të dërgosh Token-in JWT automatikisht në çdo kërkesë
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Supozojmë se e ruan tokenin këtu
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AUTH FUNCTIONS ---
// Vini re: Nëse VITE_API_URL është "https://cinecloud-api.onrender.com"
// Atëherë thirrja do të bëhet te: https://cinecloud-api.onrender.com/api/auth/login
export const login = (credentials) => API.post('/api/auth/login', credentials)
export const register = (userData) => API.post('/api/auth/register', userData)
export const staffLogin = (code) => API.post('/api/auth/staff-login', { code })

// --- MOVIE & BOOKING FUNCTIONS ---
export const getMovies = () => API.get('/api/movies')
export const getMovieById = (id) => API.get(`/api/movies/${id}`)
export const createBooking = (data) => API.post('/api/bookings', data)
export const checkIn = (qrToken) => API.post('/api/bookings/checkin', { qrToken })
export const getStats = () => API.get('/api/bookings/stats')

export default API;