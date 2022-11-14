const bcrypt = require('bcryptjs');
const db = require('../models/index');
const Account = require('../models/Account');

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
    return await db.Account.findAll();
}

async function getByEmail(email) {
    console.log("searching for ");
    return await getAccount(email);
}

async function getById(employee_id) {
    return await db.Account.findOne({ where: { employee_id: employee_id }});
}

async function create(params) {
    // validate
    console.log("creating");
    if (await getByEmail( params.email )) {
        throw 'Account ' + params.email + ' already exists';
    }
    console.log("creating...");
    const account = new db.Account(params);
    console.log("created");
    // save employee
    await account.save();
}

async function update(email, refresh_token) {
    console.log("updating " + email);
    const account = await getAccount(email);
    if (!account) {
        console.log(`No employee matches ID ${email}.`);
    }
    // console.log("using refresh token: " + refresh_token);
    const result = await db.Account.update({ refresh_token: refresh_token }, { where: { email: email } });
}

async function _delete(email) {
    const account = await getAccount(email);
    await account.destroy();
}
async function getEmailWithRefreshToken(email) {
    const account = await getAccount(email);
    return account.email;
}

async function updateRefreshToken(email, refreshToken) {
    const account = getAccount(email);
    const newTokArray = account.refresh_token + "," + refreshToken;
    account.refresh_token = newTokArray;
    account.save();
}
async function deleteRefreshToken(email, refreshToken) {
    const account = getAccount(email);
    // console.log(account.refresh_token);
    const x = account.refresh_token.split(",");
    account.refresh_token = x.filter(r => r !== refreshToken);
    account.save();
}
// helper functions
async function getByRefreshToken(refreshToken) {
    const account = await db.Account.findOne({ where: { refresh_token: refreshToken } });
    return account;
}
async function getAccount(email) {
    // console.log("searching");
    const account = await db.Account.findOne({ where: { email: email } });
    // console.log("searched");
    // console.log(account);
    // if (!account) throw 'Account not found';
    // console.log(JSON.stringify(account.dataValues));
    // console.log(account);
    return account;
}