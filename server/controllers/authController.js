const User = require('../models/User')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Ky email është i regjistruar!' })
    }

    const user = new User({ name, email, password, role: 'client' })
    await user.save()

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error("GABIMI REAL NË BACKEND:", error)
    res.status(500).json({ message: error.message || 'Gabim në server!' })
  }
}

// ✅ LOGIN (client)
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User nuk ekziston!' })
    }

    // NOTE: nëse nuk ke bcrypt, kjo është thjesht krahasim direkt
    if (user.password !== password) {
      return res.status(400).json({ message: 'Password i gabuar!' })
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ STAFF LOGIN
const staffLogin = async (req, res) => {
  try {
    const { code } = req.body

    // shembull i thjeshtë (mund ta lidhësh me DB më vonë)
    if (code !== process.env.STAFF_CODE) {
      return res.status(401).json({ message: 'Kodi i stafit është i gabuar!' })
    }

    const token = jwt.sign(
      { role: 'staff' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  register,
  login,
  staffLogin
}