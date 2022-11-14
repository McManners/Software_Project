const db = require('../models/index');

const getAllForRefreshToken = async (req, res) => {
    console.log(req.email);
    console.log("hey");
    console.log("ticket controller req: " + req);
    const refresh_token = req?.cookies?.jwt;
    if (!refresh_token) return res.sendStatus(401);
    // console.log(req);
    // console.log(req?.cookies);
    // use refresh token to find tickets, works as auth
    const account = await db.Account.findOne({ where: { refresh_token: refresh_token }});
    if (!account) return res.sendStatus(401); // unauthorized
    const tickets = await db.Ticket.findAll({ where: { eid: account.eid } });

    res.status(201).json({ tickets });
}

const createTicketForRefreshToken = async (req, res) => {
    // create for refresh token because account must be authorized, otherwise it cant create ticket
    const refresh_token = req?.cookies?.jwt;
    if (!refresh_token) return res.sendStatus(401);
    console.log("create ticket request:" + req);
    console.log("create ticket request cookies: " + req?.cookies);
    const date_from = req?.body?.date_from;
    const date_to = req?.body?.date_to;
    const request_note = req?.body?.request_note;
    console.log(req.body);
    const account = await db.Account.findOne({ where: { refresh_token: refresh_token }});
    if (!account) return res.sendStatus(401); // unauthorized
    
    try {
        const new_ticket = new db.Ticket({ 
                                            eid: account.eid, 
                                            leader_id: account.leader_id, 
                                            date_from: date_from,
                                            date_to: date_to,
                                            request_note: request_note
                                        });
        console.log(new_ticket);
        new_ticket.save();
        
        res.status(201).json({ 'success': `New ticket created for ${account.email}!` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err });
    }

}

// const getById = async (req, res) => {
//     console.log(req);
//     let tickets = await db.Ticket.findAll({ where: { eid: req.query.eid }});
//     // tickets = JSON.stringify(tickets);
//     res.json({ tickets });
// }

module.exports = { getAllForRefreshToken, createTicketForRefreshToken }