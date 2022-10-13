const Employee_Account = require('../models/Employee_Account');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required' });

    const foundEmployee = await Employee_Account.findOne({ where:{ email: email }, });
    if (!foundEmployee) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(pwd, foundEmployee.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "email": foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' } // 5min/15min whatever
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } // much longer
        );
        // Saving refreshToken with current user

        // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username); // array of other users not logged in
        // const currentUser = { ...foundUser, refreshToken };
        // usersDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        // if cookie is set to httpOnly, its not available to javascript
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        
        res.json({ accessToken }); // store in memory not cookie
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }