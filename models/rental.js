const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi)


const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        minlength: 7,
        maxlength: 23,
        default: false
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 23,
    }
});
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 223,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 225
    }
});

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;