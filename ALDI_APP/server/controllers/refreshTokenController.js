const accountController = require('./accountController');

const jwt = require('jsonwebtoken');
const db = require('../models/index');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies?.jwt);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refresh_token = cookies.jwt;

    // const foundUser = await Account.findOne({ where: { refresh_token: refreshToken } });
    const foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token } })
    console.log("foundAccount: " + foundAccount.refresh_token);
    if (!foundAccount) return res.sendStatus(403); // Forbidden

    // evaluate jwt
    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundAccount.email !== decoded.email) return res.sendStatus(403);
            const access_token = jwt.sign(
                { "email": decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' } // set longer
            );
            res.json({ access_token });
        }
    );
}

module.exports = { handleRefreshToken }