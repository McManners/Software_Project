const bcrypt = require('bcryptjs');
const db = require('../models/index');
const Employee_Account = require('../models/Employee_Account');

module.exports = {
    getAll,
    getByEmail,
    getById,
    getByRefreshToken,
    updateRefreshToken,
    deleteRefreshToken,
    getEmailWithRefreshToken,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Employee_Account.findAll();
}

async function getByEmail(email) {
    console.log("searching for ");
    return await getEmployee_Account(email);
}

async function getById(employee_id) {
    return await db.Employee_Account.findOne({ where: { employee_id: employee_id }});
}

async function create(params) {
    // validate
    console.log("creating");
    if (await getByEmail( params.email )) {
        // console.log("exists");
        throw 'Employee_Account ' + params.email + ' already exists';
    }
    console.log("creating...");
    const employee_account = new db.Employee_Account(params);
    console.log("created");
    // save employee
    await employee_account.save();
}

async function update(email, refresh_token) {
    console.log("updating " + email);
    const employee_account = await getEmployee_Account(email);
    if (!employee_account) {
        console.log(`No employee matches ID ${email}.`);
    }
    console.log("using refresh token: " + refresh_token);
    const result = await db.Employee_Account.update({ refresh_token: refresh_token }, { where: { email: email } });
}

async function _delete(email) {
    const employee_account = await getEmployee_Account(email);
    await employee_account.destroy();
}
async function getEmailWithRefreshToken(email) {
    const employee_account = await getEmployee_Account(email);
    return employee_account.email;
}

async function updateRefreshToken(email, refreshToken) {
    const employee_account = getEmployee_Account(email);
    const newTokArray = employee_account.refresh_token + "," + refreshToken;
    employee_account.refresh_token = newTokArray;
    employee_account.save();
}
async function deleteRefreshToken(email, refreshToken) {
    const employee_account = getEmployee_Account(email);
    console.log(employee_account.refresh_token);
    const x = employee_account.refresh_token.split(",");
    employee_account.refresh_token = x.filter(r => r !== refreshToken);
    employee_account.save();
}
// helper functions
async function getByRefreshToken(refreshToken) {
    const employee_account = await db.Employee_Account.findOne({ where: { refresh_token: refreshToken } });
    return employee_account;
}
async function getEmployee_Account(email) {
    // console.log("searching");
    const employee_account = await db.Employee_Account.findOne({ where: { email: email } });
    // console.log("searched");
    // console.log(employee_account);
    // if (!employee_account) throw 'Employee_Account not found';
    // console.log(JSON.stringify(employee_account.dataValues));
    // console.log(employee_account);
    return employee_account;
}