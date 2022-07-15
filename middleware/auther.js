const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token);
    if (!token) return res.status(401).send('Acces denied. No token provided.');
    try {
        const decodedPayload = jwt.verify(token, process.env.vidly_tokenPrivateKey);
        req.user = decodedPayload;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;

