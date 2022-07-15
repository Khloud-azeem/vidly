const auth = require("../middleware/auther");
const { User, validate } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');

//router
const router = express.Router();
const usersApiDebugger = require('debug')('router:usersApi');

router.get('/me', auth, async (req, res) => {
    //didnt send id, not to send the id of another user & get their data
    try {
        const user = await User.findById(req.user._id).select('-password');
        usersApiDebugger(user);
        res.send(user);
    } catch (error) {
        usersApiDebugger(error.message);
        res.send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) return res.status(400).send(result.error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered');
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        });
        await user.save();
        usersApiDebugger(user);

        const token = user.generateAuthToken();
        res
            .header('x-auth-token', token)
            .send({
                id: user._id,
                name: user.name,
                email: user.email,
            });
    } catch (error) {
        usersApiDebugger(error.message);
        res.send(error.message);
    }
});

module.exports = router;