const employeeAccountController = require('./employeeAccountController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required' });
    // console.log(`Unsigned cookies: ${req.cookies}`)
    const foundUser = await employeeAccountController.getByEmail(email);
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    // console.log(`Password: ${password} Hashed in DB: ${foundUser.password} Match: ${match}`);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "email": foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5s' } // 5min/15min whatever
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '10s' } // much longer
        );

            // console.log("Access Token: " + accessToken);
            // console.log("Refresh Token: " + refreshToken);

            // let newRefreshTokenArray = !cookies?.jwt ? foundUser.refresh_token : employeeAccountController.deleteRefreshToken(email, refreshToken);
        
        // if (cookies?.jwt) {
        //     console.log("yes cookies");
        //     const refreshToken = cookies.jwt;
        //     const foundToken = await employeeAccountController.getByRefreshToken(refreshToken);

        //     if (!foundToken) {
        //         newRefreshTokenArray = [];
        //     }

        //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'
        //     , secure: true })
        // }
            // Saving refreshToken with current user
        // employeeAccountController.update(email, { refresh_token: refreshToken });

        // foundUser.refresh_token = [...newRefreshTokenArray, refreshToken];
        // const result = await foundUser.save();
        // console.log(result);
        employeeAccountController.update(email, refreshToken);

        // if cookie is set to httpOnly, its not available to javascript
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        // console.log(`--------COOKIEJWTCREATION: ${res.cookie}`);
        res.json({ accessToken }); // store in memory not cookie
        // console.log(`Signed Cookies: ${req.signedCookies}`);
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }