const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    // console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log("---------test");
            if (err) return res.sendStatus(403); // recieved token but something wasnt right.. (tampered etc)
            req.email = decoded.email
            next();
        }
    );
}

module.exports = verifyJWT;