// const allowedOrigins = require('../config/allowedOrigins');
const allowedOrigins = [
    'http://127.0.0.1:3001',
    'http://localhost:3001'
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Controller-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;