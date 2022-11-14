// const allowedOrigins = require('../config/allowedOrigins');
const allowedOrigins = [
    'http://127.0.0.1:3001',
    'http://localhost:3001',
    'http://localhost:3000'
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        console.log("origin is allowed");
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;