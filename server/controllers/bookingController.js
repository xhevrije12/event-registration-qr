const Booking = require('../models/Booking')
const Movie = require('../models/Movie')
const QRCode = require('qrcode')
const jwt = require('jsonwebtoken')

// Krijo rezervim + gjenero QR
const createBooking = async (req, res) => {
  try {
    const { movieId, movieTitle, showtime, customerName, customerEmail, seats } = req.body

    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json({ message: 'Filmi nuk u gjet' })
    }

    const totalPrice = movie.price * seats

    // Gjenero QR Token
    const qrToken = jwt.sign(
      { movieId, movieTitle, showtime, customerName, seats },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Gjenero QR Code si imazh
    const qrCode = await QRCode.toDataURL(qrToken)

    const booking = new Booking({
      movieId,
      movieTitle,
      showtime,
      customerName,
      customerEmail,
      seats,
      totalPrice,
      qrCode,
      qrToken,
      status: 'active'
    })

    await booking.save()
    res.status(201).json(booking)

  } catch (error) {
    res.status(500).json({ message: 'Gabim në server' })
  }
}

// Valido QR — Check-in
const checkIn = async (req, res) => {
  try {
    const { qrToken } = req.body

    // Verifiko JWT
    const decoded = jwt.verify(qrToken, process.env.JWT_SECRET)

    // Gjej booking
    const booking = await Booking.findOne({ qrToken })

    if (!booking) {
      return res.status(404).json({ valid: false, message: '❌ QR i pavlefshëm!' })
    }
    if (booking.status === 'used') {
      return res.status(400).json({ valid: false, message: '⚠️ Tashmë i skanuar!' })
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ valid: false, message: '❌ Biletë e anuluar!' })
    }

    // Shëno si të ardhur
    booking.status = 'used'
    booking.checkedInAt = new Date()
    await booking.save()

    res.json({
      valid: true,
      message: `✅ Mirë se vjen, ${booking.customerName}!`,
      booking
    })

  } catch (error) {
    res.status(400).json({ valid: false, message: '❌ QR i pavlefshëm!' })
  }
}

// Merr statistikat
const getStats = async (req, res) => {
  try {
    const total = await Booking.countDocuments()
    const checkedIn = await Booking.countDocuments({ status: 'used' })
    const active = await Booking.countDocuments({ status: 'active' })

    res.json({ total, checkedIn, active })
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server' })
  }
}

module.exports = { createBooking, checkIn, getStats }