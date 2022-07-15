const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');

 module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly-app')
.then(() => dbDebugger("Connected to DB..."))
.catch((error) => console.log(error.message));
 }