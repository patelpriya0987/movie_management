const Movie = require('../models/movie');
const fs = require('fs');
const path = require('path');

const defaultController = async (req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies });
};
const getAddMovie = (req, res) => {
    res.render('addMovie');
};

const postAddMovie = async (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
        rating: req.body.rating,
        poster: req.file ? req.file.filename : undefined
    });

    await newMovie.save();
    res.redirect('/');
};
const getEditMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.render('editMovie', { movie });
};
const postUpdateMovie = async (req, res) => {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        movie.title = req.body.title;
        movie.description = req.body.description;
        movie.releaseDate = req.body.releaseDate;
        movie.genre = req.body.genre;
        movie.rating = req.body.rating;
        if (req.file) {
            const oldPosterPath = path.join(__dirname, '../uploads/', movie.poster);
            fs.unlink(oldPosterPath, (err) => {
                if (err) {
                    console.error('Error while deleting old poster:', err);
                }
            });
            movie.poster = req.file.filename;
        }
        await movie.save();
        res.redirect('/');
};

 const getDeleteMovie = async (req, res) => {
    const movieId = req.params.id;
        const movie = await Movie.findById(movieId);

        const posterPath = path.join(__dirname, '../uploads/', movie.poster);

        await Movie.findByIdAndDelete(movieId);

        // Delete the poster image from the file system
        fs.unlink(posterPath, (err) => {
            if (err) {
                console.error('Error while deleting poster:', err);
            }
        });

        res.redirect('/');
};
module.exports = {getAddMovie,getDeleteMovie , postUpdateMovie , getEditMovie , postAddMovie , defaultController};