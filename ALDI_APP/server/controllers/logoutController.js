const employeeAccountController = require('../controllers/employeeAccountController');

const handleLogout = async (req, res) => {
    // const { email, password } = req.body;
    // if (!email || !password) return res.status(400).json({ 'message': 'Logout Error: cant find account.'});
    console.log("hello1");
    // on client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;
    console.log("hello2");
    // is refreshToken in db.employee?
    // const foundUser = await Employee_Account.findOne({ where: { refresh_token: refreshToken } });
    const foundUser = await employeeAccountController.getByRefreshToken(refreshToken);

    console.log("hello3");
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); // Forbidden
    }
    console.log("hello4");
    // Delete refreshToken in db
    // employeeAccountController.update({ refresh_token: "" });
    foundUser.refresh_token = "";
    foundUser.save();
    console.log(foundUser);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }