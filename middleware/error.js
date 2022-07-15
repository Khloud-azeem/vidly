module.exports = function (err, req, res, next) { 
    //logging error
    res.status(500).send('Something went wrong. Please try again.');
}