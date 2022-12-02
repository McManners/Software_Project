const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');
const db = require('../models/index');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required' });
    const foundAccount = await db.Account.findOne({ where: { email: email }});
    if (!foundAccount) return res.sendStatus(401); // Unauthorized

    const foundEmployee = await db.Employee.findByPk(foundAccount.eid);
    if (!foundEmployee) return res.status(404).json({ 'message': `Cant find employee by account eid ${foundAccount.eid}` }); // Unauthorized
    const foundEmployee_Type = await db.Employee_Type.findByPk(foundEmployee.employee_type_id);
    if (!foundEmployee_Type) return res.status(404).json({ 'message': `Cant find emplyee type by pk ${foundEmployee.employee_type_id}` }); // Unauthorized
    // console.log(foundAccount);
    const employee_type =  foundEmployee_Type.employee_type;
    // evaluate password
    const match = await bcrypt.compare(password, foundAccount.password);
    if (match) {
        // create JWTs
        const access_token = jwt.sign(
            {
                "email": foundAccount.email,
                "employee_type": foundEmployee_Type.employee_type
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' } // 5min/15min whatever
        );
        const refresh_token = jwt.sign(
            { 
                "email": foundAccount.email,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30m' } // much longer
        );
        foundAccount.refresh_token = refresh_token;
        foundAccount.save();
        console.log("auth access token" + access_token);
        // if cookie is set to httpOnly, its not available to javascript
        res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: /*24 * 60 * 60 * 1000*/ 30 * 1000 * 1000 });
        res.cookie('logged', true, { httpOnly: false, sameSite: 'None', secure: true, maxAge: 30 * 1000 * 1000 })
        // console.log("aaa " + access_token);
        res.json( { access_token, employee_type }); // store in memory not cookie
        console.log("auth is good");
    } else {
        console.log("auth is bad");
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }