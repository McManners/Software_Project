const db = require("../models");

const getPTOByRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);
    const refresh_token = cookies.jwt;
    const foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token }});
    if (!foundAccount) return res.sendStatus(402) // Unauthorized
    const foundPTO = await db.PTO_Balance.findOne({ where: { eid: foundAccount.eid }});
    if (!foundPTO) return res.status(404).json({ "message": "Cannot find PTO entry!" });
    res.status(201).json({ foundPTO });
}

module.exports = { getPTOByRefreshToken }