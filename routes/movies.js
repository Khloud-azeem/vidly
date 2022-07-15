const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');

const { Movie, validate } = require('../models/movie');

const moviesApiDebugger = require('debug')('router:moviesApi');

router.get('/', async (req, res) => {
    try {
        let movies = await Movie.find();
        moviesApiDebugger(movies);
        res.send(movies);
    } catch (error) {
        moviesApiDebugger(error.message);
        res.send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("couldn't find movie");
        moviesApiDebugger(movie);
        res.send(movie);
    } catch (error) {
        moviesApiDebugger(error.message);
        res.send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(404).send('Invalid genre');
        const newMovie = new Movie({
            title: req.body.title,
            //here we didn't store the genre we found already because we only wanna save specific properties of it not all
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        await newMovie.save();
        moviesApiDebugger(newMovie);
        res.send(newMovie);
    } catch (error) {
        moviesApiDebugger(error.message);
        res.send(error.message);
    }
});

// router.put('/:id', async (req, res) => {
//     try {
//         const result = validateMovie(req.body);
//         if (result.error) {
//             moviesApiDebugger(result.error.details[0].message);
//             return res.status(400).send(result.error.details[0].message);
//         }

//         let movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
//         moviesApiDebugger('movie');

//         if (!movie) return res.status(404).send("couldn't find movie");
//         // movie.name == req.body.name;
//         res.send(movie);
//     } catch (error) {
//         moviesApiDebugger(error.message);
//         res.send(error.message);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         // const movie = movies.find(g => g.id == parseInt(req.params.id));
//         // if (!movie) return res.status(404).send("couldn't find movie");
//         // const index = movies.indexOf(movie);
//         // movies.splice(index, 1);
//         const movie = await Movie.findByIdAndRemove(req.params.id);
//         if (!movie) return res.status(404).send("couldn't find movie");
//         moviesApiDebugger(movie);
//         res.send(movie);
//     } catch (error) {
//         moviesApiDebugger(error.message);
//         res.send(error.message);
//     }
// });


module.exports = router;