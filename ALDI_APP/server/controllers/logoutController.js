const db = require('../models/index');
const jwt = require('jsonwebtoken');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies.jwt) return res.status(204) // No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('logged');
    const foundAccount = await db.Account.findOne({ where: { refresh_token: cookies.jwt } });
    if (!foundAccount) return res.status(200);
    foundAccount.refresh_token = "";
    foundAccount.save();
    
    res.status(201).json({ message: 'Logged out' });
}

module.exports = { handleLogout }