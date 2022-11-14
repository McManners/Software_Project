const jwt = require('jsonwebtoken');
const db = require('../models/index');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refresh_token = cookies.jwt;

    // const foundUser = await Account.findOne({ where: { refresh_token: refreshToken } });
    const foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token } });
    if (!foundAccount) return res.sendStatus(403); // Forbidden
    const foundEmployee = await db.Employee.findByPk(foundAccount.eid);
    if (!foundEmployee) return res.status(404).json({ 'message': `Cant find employee by account eid ${foundAccount.eid}` }); // Unauthorized
    const foundEmployee_Type = await db.Employee_Type.findByPk(foundEmployee.employee_type_id);
    if (!foundEmployee_Type) return res.status(404).json({ 'message': `Cant find emplyee type by pk ${foundEmployee.employee_type_id}` }); // Unauthorized
    const employee_type = foundEmployee_Type.employee_type;
    // evaluate jwt
    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundAccount.email !== decoded.email) return res.sendStatus(403);
            const access_token = jwt.sign(
                {
                    "email": decoded.email,
                    "employee_type": decoded.employee_type
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' } // set longer
            );
            res.json({ access_token, employee_type });
        }
    );
}

module.exports = { handleRefreshToken }