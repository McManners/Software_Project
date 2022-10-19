const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Employee_Account = require('../models/Employee_Account');
const { Console } = require('console');

module.exports = {
    getAll,
    getByEmail,
    getByRefreshToken,
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

async function update(email, params) {
    const employee_account = await getEmployee_Account(email);

    // validate
    const employee_accountChanged = params.email && employee_account.email !== params.email;
    if (employee_accountChanged && await db.Employee_Account.findOne({ where: { email: params.email } })) {
        throw 'Employee_Account ' + params.email + ' is already taken';
    }
    console.log("Updated!");
    // console.log(employee_account);
    // copy params to employee_account and save
    // Object.assign(employee_account, params);
    // await employee_account.save();
    db.Employee_Account.update({ refresh_token: params.refresh_token }, { where: { email: email } });
    // console.log(employee_account);
}

async function _delete(email) {
    const employee_account = await getEmployee_Account(email);
    await employee_account.destroy();
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