const jwt = require('jsonwebtoken');
const db = require('../models/index');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refresh_token = cookies.jwt;

    // const foundUser = await Account.findOne({ where: { refresh_token: refreshToken } });
    const foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token } });
    if (!foundAccount) return res.status(403).json({ "message": `cant find account for refresh token: ${refresh_token}`}); // Forbidden
    const foundEmployee = await db.Employee.findByPk(foundAccount.employee_id);
    if (!foundEmployee) return res.status(404).json({ 'message': `Cant find employee by account employee_id ${foundAccount.employee_id}` }); // Unauthorized
    const foundEmployee_Type = await db.Employee_Type.findByPk(foundEmployee.employee_type_id);
    if (!foundEmployee_Type) return res.status(404).json({ 'message': `Cant find emplyee type by pk ${foundEmployee.employee_type_id}` }); // Unauthorized
    const employee_type = foundEmployee_Type.employee_type;
    const first_name = foundEmployee.first_name;
    const last_name = foundEmployee.last_name;

    // evaluate jwt
    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundAccount.employee_id !== Number(decoded.employee_id)) return res.sendStatus(403);
            const access_token = jwt.sign(
                {
                    "employee_id": decoded.employee_id,
                    "employee_type": decoded.employee_type,
                    "first_name": decoded.first_name,
                    "last_name": decoded.last_name
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1hr' } // set longer
            );
            res.json({ access_token, employee_type, first_name, last_name });
        }
    );
}

module.exports = { handleRefreshToken }