const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');
const db = require('../models/index');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required' });
    const foundAccount = await db.Account.findOne({ where: { email: email }});
    if (!foundAccount) return res.sendStatus(401); // Unauthorized

    const foundEmployee = await db.Employee.findByPk(foundAccount.employee_id);
    if (!foundEmployee) return res.status(404).json({ 'message': `Cant find employee by account employee_id ${foundAccount.employee_id}` }); // Unauthorized
    const foundEmployee_Type = await db.Employee_Type.findByPk(foundEmployee.employee_type_id);
    console.log(foundEmployee_Type)
    if (!foundEmployee_Type) return res.status(404).json({ 'message': `Cant find emplyee type by pk ${foundEmployee.employee_type_id}` }); // Unauthorized
    // console.log(foundAccount);
    const employee_type = await foundEmployee_Type.employee_type;
    const first_name = await foundEmployee.first_name;
    const last_name = await foundEmployee.last_name;
    // evaluate password
    console.log(foundAccount)
    const match = await bcrypt.compare(password, foundAccount.password);
    if (match) {
        // create JWTs
        const access_token = jwt.sign(
            {
                "employee_id": foundAccount.employee_id,
                "employee_type": foundEmployee_Type.employee_type,
                "first_name": first_name,
                "last_name": last_name
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1hr' } // 5min/15min whatever
        );
        const refresh_token = jwt.sign(
            { 
                "employee_id": foundAccount.employee_id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '24hr' } // much longer
        );
        foundAccount.refresh_token = refresh_token;
        foundAccount.save();
        console.log("auth access token ----" + access_token);
        // if cookie is set to httpOnly, its not available to javascript
        res.cookie('jwt', refresh_token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('logged', true, { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json( { access_token, employee_type, first_name, last_name }); // store in memory not cookie
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }