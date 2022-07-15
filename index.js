require('express-async-errors');
require('dotenv').config()
const startupDebugger = require('debug')('app:startup');
const helmet = require('helmet');
const morgan = require('morgan');

const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

//configurations
console.log(`tokenPrivateKey: ${process.env.vidly_tokenPrivateKey}`); //undefined 
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger("Morgan enabled...");
}
if(!process.env.vidly_tokenPrivateKey){
    startupDebugger('FATAL ERROR: tokenPrivateKey not defined.');
    process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.set('view engine', 'pug');


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
