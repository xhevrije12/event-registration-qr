const Movie = require('../models/Movie')

// Merr të gjithë filmat
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server' })
  }
}

// Merr 1 film sipas ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
      return res.status(404).json({ message: 'Filmi nuk u gjet' })
    }
    res.json(movie)
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server' })
  }
}

// Shto film të ri
const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body)
    await movie.save()
    res.status(201).json(movie)
  } catch (error) {
    res.status(500).json({ message: 'Gabim në server' })
  }
}

module.exports = { getMovies, getMovieById, createMovie }