const db = require('../models/index');

const createTicketResponse = async (req, res) => {
    console.log("ticket response request: " + req.email);
    const cookies = req?.cookies;
    const refresh_token = cookies?.jwt;
    if (!refresh_token) return res.sendStatus(401);
    console.log(req.body);
    const ticket_id = req.body.ticket_id;
    const ticket = await db.Ticket.findOne({ where: { ticket_id: ticket_id } })
    if (!ticket) return res.status(404).json({ "message": "ticket not found!"});
    const response_type = req?.body?.response_type;
    const response = req?.body?.response;
    const foundAccount = await db.Account.findOne({ where: { refresh_token: refresh_token } });
    if (!foundAccount) return res.status(404).json({ "message": "account not found!"});

    console.log("account: " + foundAccount);

    try {
        const newResponse = new db.Ticket_Response({
            ticket_id: ticket_id,
            leader_id: foundAccount.employee_id, // might want response employee_id...
            response_type: response_type,
            response: response
        })
        newResponse.save();

        res.status(201).json({ "message": "New ticket response created! " });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err });
    }
}

module.exports = { createTicketResponse }