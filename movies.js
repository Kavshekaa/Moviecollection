const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Search movies by title
router.get('/search', async (req, res) => {
    const { title } = req.query;
    try {
        const movies = await Movie.find({ title: new RegExp(title, 'i') });
        res.json(movies);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add a new movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        genre: req.body.genre,
        year: req.body.year
    });

    try {
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
