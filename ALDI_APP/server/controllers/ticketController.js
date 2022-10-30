const db = require('../models/index');

module.exports = {
    getAll,
    getTicketsByEmail,
    create
};

async function getAll() {
    return await db.Ticket.findAll();
}

async function getTicketsByEmail(email) {;
    const employee_id = db.Employee.findOne({ where: { email: email }});

    return await db.Ticket.findAll({ where: { employee_id: employee_id}});
}

async function create(req, res) {
    // validate
    const refreshToken = req.cookies.jwt;
    console.log(refreshToken);
    if (refreshToken === undefined) return res.sendStatus(403); // forbidden. Dont have a refresh token!
    console.log("creating ticket for token: " + refreshToken);
    // if (await getByEmail( params.email )) {
    //     // console.log("exists");
    //     throw 'Employee_Account ' + params.email + ' already exists';
    // }
    console.log("creating...");
    const employee_account = new db.Employee_Account(params);
    console.log("created");
    // save employee
    await employee_account.save();
}