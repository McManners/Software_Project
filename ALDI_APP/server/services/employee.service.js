const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Employee.findAll();
}

async function getById(eid) {
    return await getEmployee(eid);
}

async function create(params) {
    // validate
    if (await db.Employee.findOne({ where: { eid: params.eid } })) {
        throw 'Employee_ID "' + params.eid + '" already exists';
    }

    const employee = new db.Employee(params);

    // save employee
    await employee.save();
}

async function update(employee_eid, params) {
    const employee = await getEmployee(employee_eid);

    // validate
    const eidChanged = params.eid && employee.eid !== params.eid;
    if (eidChanged && await db.Employee.findOne({ where: { eid: params.eid } })) {
        throw 'Employee_ID "' + params.eid + '" is already taken';
    }

    // copy params to employee and save
    Object.assign(employee, params);
    await employee.save();
}

async function _delete(eid) {
    const employee = await getEmployee(eid);
    await employee.destroy();
}

// helper functions

async function getEmployee(eid) {
    const employee = await db.Employee.findByPk(eid);
    if (!employee) throw 'Employee not found';
    return employee;
}