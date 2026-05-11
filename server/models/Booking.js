const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  showtime: {
    type: Date,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true,
    default: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  qrCode: {
    type: String,
    default: ''
  },
  qrToken: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'used', 'cancelled'],
    default: 'active'
  },
  checkedInAt: {
    type: Date,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)