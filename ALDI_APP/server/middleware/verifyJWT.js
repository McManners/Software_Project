const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log("verifyJWT req: " + req?.body);
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("verify auth header: " + authHeader);
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    // console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(err);
            console.log("---------test");
            if (err) return res.sendStatus(403); // recieved token but something wasnt right.. (tampered etc)
            req.eid = decoded.eid
            next();
        }
    );
}

module.exports = verifyJWT;