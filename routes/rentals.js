const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Fawn = require('fawn');
const express = require('express');

//router
const router = express.Router();
const rentalsApiDebugger = require('debug')('router:rentalsApi');

// Fawn.init(mongoose);
Fawn.init('mongodb://localhost/vidly-app');

router.get('/', async (req, res) => {
    try {
        let rentals = await Rental.find();
        rentalsApiDebugger(rentals);
        res.send(rentals);
    } catch (error) {
        rentalsApiDebugger(error.message);
        res.send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);

        const customer = await Customer.findById({ _id: req.body.customerId });
        if (!customer) return res.status(404).send("Invalid customer.");

        const movie = await Movie.findById({ _id: req.body.movieId });
        if (!movie) return res.status(404).send("Invalid movie.");

        if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
        let newRental = new Rental({
            customer: {
                isGold: customer.isGold,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            },
        });
        // newRental = await newRental.save();
        // rentalsApiDebugger(newRental);
        // movie.numberInStock--;
        // await movie.save();
        try {
            new Fawn.Task()
                .save('rentals', newRental)
                .update('movies', { _id: movie._id }, {
                    $inc: { numberInStock: -1 }
                })
                .run();
            res.send(newRental);
        } catch (ex) {
            res.status(500).send('Something went wrong. Please try again.');
        }
    } catch (error) {
        rentalsApiDebugger(error.message);
        res.send(error.message);
    }
});

module.exports = router;