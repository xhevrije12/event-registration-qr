const mongoose = require('mongoose')
const Movie = require('./models/Movie')
require('dotenv').config()

const movies = [
  // 🔥 SEKSIONI 1 — Të Rinjtë
  {
    title: "Inception",
    description: "Një hajdut që vjedh sekretet nga ëndrrat merr një mision të pamundur.",
    genre: "Sci-Fi",
    duration: 148,
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    showtimes: [
      new Date('2026-05-15T18:00:00'),
      new Date('2026-05-15T21:00:00'),
      new Date('2026-05-16T19:00:00')
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
      new Date('2026-05-15T17:00:00'),
      new Date('2026-05-15T20:00:00'),
      new Date('2026-05-16T18:00:00')
    ],
    price: 8,
    availableSeats: 15
  },
  {
    title: "Interstellar",
    description: "Një ekip astronautësh udhëton përmes një vrimë krimbi për të shpëtuar njerëzimin.",
    genre: "Sci-Fi",
    duration: 169,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    showtimes: [
      new Date('2026-05-16T17:00:00'),
      new Date('2026-05-16T20:30:00'),
      new Date('2026-05-17T19:00:00')
    ],
    price: 9,
    availableSeats: 80
  },
  {
    title: "Avatar",
    description: "Një ushtar udhëton në planetin Pandora ku takon popullin Na'vi.",
    genre: "Adventure",
    duration: 162,
    poster: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    showtimes: [
      new Date('2026-05-17T17:00:00'),
      new Date('2026-05-17T20:00:00'),
      new Date('2026-05-18T18:00:00')
    ],
    price: 10,
    availableSeats: 120
  },

  // 🎬 SEKSIONI 2 — Klasikët
{
  title: "Joker",
  description: "Arthur Fleck, një komedian i dështuar, transformohet në kriminelin e famshëm Joker.",
  genre: "Drama",
  duration: 122,
  poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  showtimes: [
    new Date('2026-05-18T17:00:00'),
    new Date('2026-05-18T20:00:00'),
    new Date('2026-05-19T18:00:00')
  ],
  price: 7,
  availableSeats: 90
},
  {
    title: "Pulp Fiction",
    description: "Histori të ndërthurura të krimit, dhunës dhe shansit në Los Angeles.",
    genre: "Drama",
    duration: 154,
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    showtimes: [
      new Date('2026-05-19T18:00:00'),
      new Date('2026-05-19T21:00:00'),
      new Date('2026-05-20T19:00:00')
    ],
    price: 7,
    availableSeats: 12
  },
  {
    title: "Forrest Gump",
    description: "Historia e një njeriu të thjeshtë që ndikon në ngjarje historike të mëdha.",
    genre: "Drama",
    duration: 142,
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    showtimes: [
      new Date('2026-05-20T17:00:00'),
      new Date('2026-05-20T20:00:00'),
      new Date('2026-05-21T18:00:00')
    ],
    price: 7,
    availableSeats: 95
  },
  {
    title: "The Matrix",
    description: "Një programues zbulon se bota është një simulim virtual i kontrolluar nga makinat.",
    genre: "Sci-Fi",
    duration: 136,
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    showtimes: [
      new Date('2026-05-21T18:00:00'),
      new Date('2026-05-21T21:00:00'),
      new Date('2026-05-22T19:00:00')
    ],
    price: 8,
    availableSeats: 18
  },

  // 🍿 SEKSIONI 3 — Aksion & Aventurë
  {
    title: "John Wick",
    description: "Një ish-vrasës profesionist kthehet në botën e errët pas vdekjes së qenit të tij.",
    genre: "Action",
    duration: 101,
    poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    showtimes: [
      new Date('2026-05-22T17:00:00'),
      new Date('2026-05-22T20:00:00'),
      new Date('2026-05-23T18:00:00')
    ],
    price: 8,
    availableSeats: 110
  },
{
  title: "Spider-Man: No Way Home",
  description: "Peter Parker kërkon ndihmën e Doctor Strange për të fshirë identitetin e tij si Spider-Man.",
  genre: "Action",
  duration: 148,
  poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  showtimes: [
    new Date('2026-05-23T18:00:00'),
    new Date('2026-05-23T21:00:00'),
    new Date('2026-05-24T19:00:00')
  ],
  price: 9,
  availableSeats: 18
},
  {
    title: "The Lion King",
    description: "Simba, i biri i mbretit, duhet të marrë vendin e tij të drejtë si mbret.",
    genre: "Adventure",
    duration: 118,
    poster: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
    showtimes: [
      new Date('2026-05-24T15:00:00'),
      new Date('2026-05-24T18:00:00'),
      new Date('2026-05-25T16:00:00')
    ],
    price: 9,
    availableSeats: 10
  },
  {
    title: "Gladiator",
    description: "Një gjeneral romak bëhet gladiator dhe kërkon hakmarrje kundër perandorit.",
    genre: "Action",
    duration: 155,
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    showtimes: [
      new Date('2026-05-25T17:00:00'),
      new Date('2026-05-25T20:00:00'),
      new Date('2026-05-26T18:00:00')
    ],
    price: 9,
    availableSeats: 85
  }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB u lidh!')

    await Movie.deleteMany()
    console.log('🗑️  Filmat e vjetër u fshinë!')

    await Movie.insertMany(movies)
    console.log('🎬 12 filma u shtuan me sukses!')

    mongoose.connection.close()
    console.log('✅ U krye!')
  } catch (error) {
    console.log('❌ Gabim:', error)
  }
}

seedDB()