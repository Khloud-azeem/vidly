const auth = require("../middleware/auther");
const admin = require("../middleware/admin");
const catchError = require('../middleware/async-error')
const express = require('express');
const { Genre, validateGenre } = require('../models/genre');

//router
const router = express.Router();

const genresApiDebugger = require('debug')('router:genresApi');

router.get('/', catchError(async (req, res, next) => {
        let genres = await Genre.find();
        genresApiDebugger(genres);
        res.send(genres);
}));

router.get('/:id', async (req, res) => {
    try {
        let genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send("couldn't find genre");
        genresApiDebugger(genre);
        res.send(genre);
    } catch (error) {
        genresApiDebugger(error.message);
        res.send(error.message);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
        });
        const result = schema.validate(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);
        let newGenre = new Genre({
            name: req.body.name,
        });
        newGenre = await newGenre.save();
        genresApiDebugger(newGenre);
        res.send(newGenre);
    } catch (error) {
        genresApiDebugger(error.message);
        res.send(error.message);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const result = validateGenre(req.body);
        if (result.error) {
            genresApiDebugger(result.error.details[0].message);
            return res.status(400).send(result.error.details[0].message);
        }
        let genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        genresApiDebugger('genre');

        if (!genre) return res.status(404).send("couldn't find genre");
        res.send(genre);
    } catch (error) {
        genresApiDebugger(error.message);
        res.send(error.message);
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send("couldn't find genre");
        genresApiDebugger(genre);
        res.send(genre);
    } catch (error) {
        genresApiDebugger(error.message);
        res.send(error.message);
    }
});

module.exports = router;