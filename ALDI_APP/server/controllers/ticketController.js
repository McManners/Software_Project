const db = require('../models/index');
const { Op } = require("sequelize");
const { REPL_MODE_SLOPPY } = require('repl');

const getAllClosed = async (req, res) => {
    console.log('getting all closed tickets');
    const employee_id = req.employee_id;
    if (!employee_id) return res.sendStatus(401);
    const employee = await db.Employee.findOne({ where: { employee_id: employee_id }});
    if (!employee) return res.sendStatus(401); // unauthorized
    // const tickets = await db.Ticket.findAll({ where: { employee_id: account.employee_id } });
    const tickets = await employee.getTicketHistory({ where: { status: { [Op.ne]: 'PENDING'}}});

    res.status(201).json({ tickets });
}
const getAllPending = async (req, res) => {
    console.log('getting all pending tickets');
    const employee_id = req.employee_id;
    if (!employee_id) return res.sendStatus(401);
    const employee = await db.Employee.findOne({ where: { employee_id: employee_id }});
    if (!employee) return res.sendStatus(401); // unauthorized
    // const tickets = await db.Ticket.findAll({ where: { employee_id: account.employee_id } });
    const tickets = await employee.getPendingTickets();

    res.status(201).json({ tickets });
}
const getAllLeaderTickets = async (req, res) => {
    console.log('getting all leader tickets');
    const employee_id = req.employee_id;
    if (!employee_id) return res.sendStatus(401);
    const account = await db.Employee.findOne({ where: { employee_id: employee_id } });
    if (!account || account.employee_type_id === 0) return res.sendStatus(401);
    // const tickets = await account.getLeaderTickets({ order: [['ticket_id', 'ASC']] });
    const tickets = await db.Ticket.findAll({ where: { leader_id: req.employee_id } });
    console.log('got tickets for leader employee_id: ' + employee_id);
    res.status(201).json({ tickets });
}

const createTicket = async (req, res) => {
    const employee_id = req.employee_id;
    if (!employee_id) return res.sendStatus(401);
    console.log(req.body)
    const date = req.body.date;
    // const pto_type_id = req.body.pto_type_id;
    const request_note = req.body.request_note;
    const pto_type_id = req.body.pto_type_id;
    console.log(pto_type_id)
    const account = await db.Account.findOne({ where: { employee_id: employee_id }});
    console.log(account.dataValues)
    if (!account) return res.sendStatus(401); // unauthorized
    const leader_id = await account.Employee.leader_id;
    // console.log(typeof pto_type_id)
    try {
        const new_ticket = await db.Ticket.create({ 
            employee_id: employee_id, 
            leader_id: leader_id,
            pto_type_id: pto_type_id,
            request_note: request_note,
            submit_date: new Date(),
            status: 'PENDING'
        });
        const ticket_id = new_ticket.ticket_id;
        date.forEach(ticket_date => createTicketDateRange(ticket_id, ticket_date));

        res.status(201).json({ 'success': `New ticket created for employee_id: ${employee_id}!` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err });
    }

}
const createResponse = (req, res) => {
    
}
const createTicketDateRange = async (ticket_id, date) => {
    console.log('ticketid: ' + ticket_id);
    console.log('date: ' + date)
    try {
        await db.Ticket_Date_Range.create({
            ticket_id: ticket_id,
            requested_date: date
        });
        return;
    } catch (err) {
        console.log(err);
    }
}

const requestMoreInformationTicket = async (req, res) => {
    console.log("requesting more info ticketcontroller");
    const leader_id = req.employee_id;
    const ticket_id = req.body.ticket_id;
    const response_note = req.body.response_note;
    const invalid_dates = req.body.invalid_dates;

    const ticket = await db.Ticket.findOne({ where: { ticket_id: ticket_id } });
    if (!ticket) return res.status(401).json({ "message": "Error, cannot find ticket_id " + ticket_id });
    // Move ticket to ticket history
    try {
        await db.Ticket_History.create({
            ticket_id: ticket.ticket_id,
            leader_id: ticket.leader_id,
            employee_id: ticket.employee_id,
            request_note: ticket.request_note,
            response_note: ticket.response_note,
            submit_date: ticket.submit_date,
            status: ticket.status,
            pto_type_id: ticket.pto_type_id,
            employee_id: ticket.employee_id
        });
        
        await ticket.set({
            leader_id: leader_id,
            response_note: response_note,
            status: "NEED MORE INFORMATION",
            submit_date: new Date().toISOString()
        });
        ticket.save();
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": err});
    }
    console.log("Updated request more ticket.")
    res.status(200).json(ticket);
}

const denyTicket = async (req, res) => {
    const leader_id = req.employee_id;
    const ticket_id = req.body.ticket_id;
    const response_note = req.body.response_note;
    const invalid_dates = req.body.invalid_dates;

    const ticket = await db.Ticket.findOne({ where: { ticket_id: ticket_id } });
    if (!ticket) return res.status(401).json({ "message": "Error, cannot find ticket_id " + ticket_id });
    // Move ticket to ticket history
    try {
        await db.Ticket_History.create({
            ticket_id: ticket.ticket_id,
            leader_id: ticket.leader_id,
            request_note: ticket.request_note,
            response_note: ticket.response_note,
            submit_date: ticket.submit_date,
            status: ticket.status,
            pto_type_id: ticket.pto_type_id,
            employee_id: ticket.employee_id
        });
        ticket.delete();
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": err});
    }

    res.status(200).json({ "message": "Ticket denied" });
}

module.exports = { getAllClosed, createTicket, getAllLeaderTickets, createResponse, getAllPending, requestMoreInformationTicket, denyTicket }