const express = require('express');
//router
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index', {
        title: 'App',
        message: 'Welcome to Vidly'
    });
});

module.exports = app;