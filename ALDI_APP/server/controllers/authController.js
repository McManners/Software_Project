const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required' });
    const foundAccount = await db.Account.findOne({ where: { email: email }});
    if (!foundAccount) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundAccount.password);
    if (match) {
        // create JWTs
        const access_token = jwt.sign(
            { "email": foundAccount.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' } // 5min/15min whatever
        );
        const refresh_token = jwt.sign(
            { "email": foundAccount.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30m' } // much longer
        );
        foundAccount.refresh_token = refresh_token;
        foundAccount.save();
        
        // if cookie is set to httpOnly, its not available to javascript
        res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        
        res.status(201).json({ access_token }); // store in memory not cookie
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }