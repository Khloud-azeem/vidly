const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 223,
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 225
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 225
    }
});

function validateMovie(movie){ //input 
    const schema = Joi.object({
        title: Joi.string().min(3).max(223).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    });
    return schema.validate();
}

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.validate = validateMovie;