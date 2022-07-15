const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        minlength: 7,
        maxlength: 23,
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 23,
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(7).max(23).required(),
        phone: Joi.string().min(7).max(23).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;