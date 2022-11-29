const db = require('../models/index');

const getAll = async (req, res) => {
    const eid = req.eid;
    if (!eid) return res.sendStatus(401);
    const employee = await db.Employee.findOne({ where: { eid: eid }});
    if (!employee) return res.sendStatus(401); // unauthorized
    // const tickets = await db.Ticket.findAll({ where: { eid: account.eid } });
    const tickets = await employee.getEmployeeTickets();

    res.status(201).json({ tickets });
}
const getAllLeaderTickets = async (req, res) => {
    const eid = req.eid;
    console.log("getAllLeaderTickets eid: " + eid);
    if (!eid) return res.sendStatus(401);
    const account = await db.Employee.findOne({ where: { eid: eid } });
    if (!account) return res.sendStatus(401);
    console.log(account);
    const tickets = await account.getLeaderTickets();
    res.status(201).json({ tickets });
}

const createTicket = async (req, res) => {
    const eid = req.body.eid;
    console.log(req.body);
    if (!eid) return res.sendStatus(401);
    const date = req.body.date;
    // const pto_type_id = req.body.pto_type_id;
    const request_note = req.body.request_note;
    console.log(req.body);
    const account = await db.Account.findOne({ where: { eid: eid }});
    if (!account) return res.sendStatus(401); // unauthorized
    const leader_id = await account.Employee.leader_id;

    try {
        const new_ticket = await db.Ticket.create({ 
            eid: eid, 
            leader_id: leader_id,
            // pto_type_id: pto_type_id, 
            request_note: request_note 
        });
        const ticket_id = new_ticket.ticket_id;
        date.forEach(ticket_date => createTicketDateRange(ticket_id, ticket_date));

        res.status(201).json({ 'success': `New ticket created for EID: ${eid}!` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err });
    }

}
const createTicketDateRange = async (ticket_id, date) => {
    try {
        await db.Ticket_Date_Range.create({
            ticket_id: ticket_id,
            start_date: date
        });
        return;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getAll, createTicket, getAllLeaderTickets }