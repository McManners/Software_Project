const db = require("../models");

const create = async (req, res) => {
    console.log(req);
    const ticket_id = req.body.ticket_id;
    const ticket = db.Ticket.findOne({ where: { ticket_id: ticket_id } });
    if (!ticket) return res.status(400).json({ "message": "cant find ticket"});
    if (ticket.status === 1) return res.status(400).json({ "message": "error, ticket already closed"});
    ticket.status = 1;
    ticket.save();
    await db.PTO.create({
        eid: ticket.eid,
        ticket_id: ticket_id
    });
    res.status(201);
}

module.exports = { create }