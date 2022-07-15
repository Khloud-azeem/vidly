const { User } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');

//router
const router = express.Router();
const usersApiDebugger = require('debug')('router:usersApi');

router.post('/', async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);

        let user = User.findOne({ email: req.body.email });
        if(!user) return res.status(400).send('Invalid email or password');
        
        isPassValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPassValid) return res.status(400).send('Invalid email or password');

        const token = user.generateAuthToken();
        res.send(token);

    } catch (error) {
        usersApiDebugger(error.message);
        res.send(error.message);
    }
});

function validate(user){
    const schema = Joi.object({
        email: Joi.string().min(7).max(255).required().email(),
        password: Joi.string().min(7).max(255).required()
    });
    return schema.validate(user);
}

module.exports = router;

