const employeeAccountController = require('./employeeAccountController');

const jwt = require('jsonwebtoken');
const db = require('../config/db');
const Employee_Account = require('../models/Employee_Account');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies?.jwt);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // const foundUser = await Employee_Account.findOne({ where: { refresh_token: refreshToken } });
    console.log("------------LOOKING FOR TOK: " + refreshToken);
    const foundUser = await employeeAccountController.getByRefreshToken(refreshToken);
    // console.log("found user: " + foundUser);
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "email": decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' } // set longer
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken }