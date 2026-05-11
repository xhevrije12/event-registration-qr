const mongoose = require('mongoose')
const Movie = require('./models/Movie')
require('dotenv').config()

const movies = [
  {
    title: "Inception",
    description: "Një hajdut që vjedh sekretet nga ëndrrat merr një mision të pamundur.",
    genre: "Sci-Fi",
    duration: 148,
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    showtimes: [
      new Date('2026-05-10T18:00:00'),
      new Date('2026-05-10T21:00:00'),
      new Date('2026-05-11T19:00:00')
    ],
    price: 8,
    availableSeats: 100
  },
  {
    title: "The Dark Knight",
    description: "Batman duhet të ndalet Joker-in që ka vendosur të krijojë kaos në Gotham.",
    genre: "Action",
    duration: 152,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    showtimes: [
      new Date('2026-05-10T17:00:00'),
      new Date('2026-05-10T20:00:00'),
      new Date('2026-05-11T18:00:00')
    ],
    price: 8,
    availableSeats: 100
  },
  {
    title: "Interstellar",
    description: "Një ekip astronautësh udhëton përmes një vrimë krimbi për të shpëtuar njerëzimin.",
    genre: "Sci-Fi",
    duration: 169,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    showtimes: [
      new Date('2026-05-11T17:00:00'),
      new Date('2026-05-11T20:30:00'),
      new Date('2026-05-12T19:00:00')
    ],
    price: 9,
    availableSeats: 80
  },
  {
    title: "Avatar",
    description: "Një ushtar i paaftë udhëton në planetin Pandora ku takon popullin Na'vi.",
    genre: "Adventure",
    duration: 162,
    poster: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    showtimes: [
      new Date('2026-05-12T17:00:00'),
      new Date('2026-05-12T20:00:00'),
      new Date('2026-05-13T18:00:00')
    ],
    price: 10,
    availableSeats: 120
  }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB u lidh!')

    await Movie.deleteMany()
    console.log('🗑️  Filmat e vjetër u fshinë!')

    await Movie.insertMany(movies)
    console.log('🎬 Filmat u shtuan me sukses!')

    mongoose.connection.close()
    console.log('✅ U krye!')
  } catch (error) {
    console.log('❌ Gabim:', error)
  }
}

seedDB()