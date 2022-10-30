const ticketController = './ticketController';
const Ticket_Date_Range = require('../models/Ticket_Date_Range');
const db = require('../models/index');

const getAll = async (req, res) => {
    const refreshToken = req?.cookies?.jwt;

    const employee_account = await db.Employee_Account.findOne({ where: { refresh_token: refreshToken }});
    const employee = await db.Employee.findOne({ where: { email: employee_account.email }})
    console.log(employee)
    const tickets = await db.Ticket.findAll({ where: { employee_id: employee.employee_id }});
    console.log(tickets);

    res.json({ tickets });
}

const getByRefreshToken = async (req, res) => {
    console.log(req);
    let tickets = await db.Ticket.findAll({ where: { employee_id: req.query.employee_id }});
    // tickets = JSON.stringify(tickets);
    res.json({ tickets });
}

module.exports = { getAll, getByRefreshToken }