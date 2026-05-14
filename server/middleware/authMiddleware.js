const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Nuk je i autorizuar!' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Token i pavlefshëm!' })
  }
}

const staffOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Nuk je i autorizuar!' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== 'staff') {
      return res.status(403).json({ message: 'Vetëm stafi mund të hyjë!' })
    }
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Token i pavlefshëm!' })
  }
}

module.exports = { protect, staffOnly }