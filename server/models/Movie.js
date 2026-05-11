const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  poster: {
    type: String,
    default: ''
  },
  showtimes: [{
    type: Date
  }],
  price: {
    type: Number,
    required: true,
    default: 8
  },
  availableSeats: {
    type: Number,
    required: true,
    default: 100
  }
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)