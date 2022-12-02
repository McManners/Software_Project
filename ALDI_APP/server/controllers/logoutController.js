const db = require('../models/index');
const jwt = require('jsonwebtoken');

const handleLogout = async (req, res) => {
    console.log("logoutController");
    // console.log(req);
    // const cookies = req.cookies;
    // if (!cookies?.jwt) return res.sendStatus(204);
    // let foundAccount = null;
    // let status = null;
    // if(!cookies?.jwt) {
    //     const payload = jwt.verify(req.body.access_token, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
    //     foundAccount = await db.Account.findOne({ where: { email: payload.email } });
    // } else {
    //     const refresh_token = cookies.jwt;
    //     foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token }});
    //     // if (!foundAccount) {
    //     //     res.clearCookie('jwt', { httpOnly: true });
    //     //     return res.sendStatus(204); // Forbidden
    //     // }
    // }
    // const payload = jwt.verify(req.body.access_token, process.env.ACCESS_TOKEN_SECRET);
    // const foundAccount = await db.Account.findOne({ where: { email: payload.email } });
    // Delete refresh_token in db
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies.jwt) return res.status(204) // No content
    const foundAccount = await db.Account.findOne({ where: { refresh_token: cookies.jwt } });
    foundAccount.refresh_token = "";
    foundAccount.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('logged');
    res.status(201).json({ message: 'Logged out' });
}

module.exports = { handleLogout }