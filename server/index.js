const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const movieRoutes = require('./routes/movieRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(express.json())

app.use('/api/movies', movieRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'CineCloud API po punon! 🎬' })
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB u lidh!'))
  .catch((err) => console.log('❌ Gabim:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Serveri po punon në port ${PORT}`)
})