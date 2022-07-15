const express = require('express');
const { Customer, validate } = require('../models/customer');

//router
const router = express.Router();
const customersApiDebugger = require('debug')('router:customersApi');

router.get('/', async (req, res) => {
    try {
        let customers = await Customer.find();
        customersApiDebugger(customers);
        res.send(customers);
    } catch (error) {
        customersApiDebugger(error.message);
        res.send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send("couldn't find customer");
        customersApiDebugger(customer);
        res.send(customer);
    } catch (error) {
        customersApiDebugger(error.message);
        res.send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);
        const newCustomer = new Customer({
            name: req.body.name,
            phone: req.body.phone
        });
        await newCustomer.save();
        customersApiDebugger(newCustomer);
        res.send(newCustomer);
    } catch (error) {
        customersApiDebugger(error.message);
        res.send(error.message);
    }
});

module.exports = router;