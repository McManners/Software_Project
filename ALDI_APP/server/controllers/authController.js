const employeeAccountController = require('./employeeAccountController');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required' });

    const foundUser = await employeeAccountController.getByEmail(email);
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    console.log(`Password: ${password} Hashed in DB: ${foundUser.password} Match: ${match}`);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "email": foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' } // 5min/15min whatever
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } // much longer
        );
        // Saving refreshToken with current user
        employeeAccountController.update(email, { refresh_token: refreshToken });

        // if cookie is set to httpOnly, its not available to javascript
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        
        res.json({ accessToken }); // store in memory not cookie
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }