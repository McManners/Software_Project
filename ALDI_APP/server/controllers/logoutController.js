const Employee = require('../models/Employee');
const Employee_Account = require('../models/Employee_Account');

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'logout error cant find account.'});

    // on client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // is refreshToken in db.employee?
    const foundUser = await Employee_Account.findOne({ where:{ email: email }, });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); // Forbidden
    }
    
    // Delete refreshToken in db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUsers, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'), // change this obviously
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { hhtpOnly: true }); // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout }