const db = require("../models");

const create = async (req, res) => {
    console.log('creating pto');
    const status = req.body.status;
    const ticket_id = req.body.ticket_id;
    const ticket = await db.Ticket.findOne({ where: { ticket_id: ticket_id } });
    console.log("date ranges: " + ticket.Ticket_Date_Ranges.length);
    if (!ticket) return res.status(400).json({ "message": "cant find ticket"});
    // if (ticket.status === "APPROVED" || ticket.status === "DENIED") return res.status(401).json({ "message": "Error, ticket already closed"});
    // ticket.status = "APPROVED";
    // ticket.save();
    const pto_balance = await db.PTO_Balance.findOne({ where: { employee_id: ticket.employee_id }});
    const vacation_taken = pto_balance.vacation_taken;
    const personal_taken = pto_balance.personal_taken;
    const sick_taken = pto_balance.sick_taken;
    console.log("V:" + vacation_taken + " P:" + personal_taken + " S:" + sick_taken);
    const days_taken = ticket.Ticket_Date_Ranges.length;
    (ticket.pto_type_id === 1) ? 
        (pto_balance.vacation_taken = vacation_taken + days_taken)
        : (ticket.pto_type_id === 2) ? 
            (pto_balance.personal_taken = personal_taken + days_taken)
                : (pto_balance.sick_taken = sick_taken + days_taken);
    pto_balance.save();
    console.log(pto_balance);

    await db.Ticket_History.create({
        ticket_id: ticket.ticket_id,
        employee_id: ticket.employee_id,
        leader_id: ticket.leader_id,
        request_note: ticket.request_note,
        response_note: ticket.response_note,
        submit_date: ticket.submit_date,
        status: 'APPROVED',
        pto_type_id: ticket.pto_type_id
    })
    console.log('create pto destroying ticket')
    ticket.destroy();
    res.status(201);
}
const getAllForLeader = async (req, res) => {
    console.log('pto get all for leader')
    const leader_id = req.employee_id;
    const ptos = await db.PTO.findAll({ include: [db.Ticket_History]});
    console.log(ptos)
    res.status(201).json(ptos);
}

module.exports = { create, getAllForLeader }