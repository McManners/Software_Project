const db = require("../models");

const verifyStatus = async (req, res) => {
    const refresh_token = req?.cookies?.jwt;
    if (!refresh_token) return res.sendStatus(403);
    const foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token }});
    if (!foundAccount) return res.status(403).json({ "message: ": "Invalid refresh token" });
    return res.sendStatus(201);
}

module.exports = { verifyStatus };