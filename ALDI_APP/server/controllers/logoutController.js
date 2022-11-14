const db = require('../models/index');

const handleLogout = async (req, res) => {
    console.log("hello1");
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refresh_token = cookies.jwt;
    console.log("hello2");
    const foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token }});

    if (!foundAccount) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); // Forbidden
    }
    // Delete refresh_token in db
    foundAccount.refresh_token = "";
    foundAccount.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }