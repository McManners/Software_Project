const bcrypt = require('bcryptjs');
const db = require('../models/index');
const Employee = require('../models/Employee');

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

async function getById(employee_id) {
    return await getEmployee(employee_id);
}

async function create(params) {
    // validate
    if (await db.Employee.findOne({ where: { employee_id: params.employee_id } })) {
        throw 'Employee_ID "' + params.employee_id + '" already exists';
    }

    const employee = new db.Employee(params);

    // save employee
    await employee.save();
}

async function update(employee_employee_id, params) {
    const employee = await getEmployee(employee_employee_id);

    // validate
    const employee_idChanged = params.employee_id && employee.employee_id !== params.employee_id;
    if (employee_idChanged && await db.Employee.findOne({ where: { employee_id: params.employee_id } })) {
        throw 'Employee_ID "' + params.employee_id + '" is already taken';
    }

    // copy params to employee and save
    Object.assign(employee, params);
    await employee.save();
}

async function _delete(employee_id) {
    const employee = await getEmployee(employee_id);
    await employee.destroy();
}

// helper functions

async function getEmployee(employee_id) {
    const employee = await db.Employee.findOne({ where: { employee_id: employee_id } });
    console.log(employee);
    if (!employee) throw 'Employee not found';
    return employee;
}