const express = require('express')
const router = express.Router()
const { createBooking, checkIn, getStats } = require('../controllers/bookingController')

router.post('/', createBooking)
router.post('/checkin', checkIn)
router.get('/stats', getStats)

module.exports = router