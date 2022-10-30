const Employee_Account = require('../models/Employee_Account');
const employeeAccountController = require('./employeeAccountController');
const employeeController = require('./employeeController');
const bcrypt = require('bcrypt');
const db = require('../models/index');

const handleNewEmployee_Account = async (req, res) => {
    console.log(req.body);
    const { email, password, employee_id } = req.body;
    if (!email || !password || !employee_id) {
        console.log("no");
        return res.status(400).json({ 'message': 'Email, Employee ID, and Password are required.' });
    }
    // TODO: check for duplicate employee email in the database
    const duplicate = await employeeAccountController.getByEmail(email);
    console.log("1");
    const duplicate_employee_id = await employeeAccountController.getById({ where: { employee_id: employee_id } })
    console.log("2");
    const employee_id_exists = await db.Employee.findOne({ where: { employee_id: employee_id } });
    console.log("3"); // TODO: Fix this to controller...
    // console.log(`${email} is a duplicate account!`);
    if (duplicate_employee_id) {
        console.log(`Account already exists for id: ${employee_id}`);
        return res.status(409).json({ "message": `This employee id has an account!`})
    } else if (!employee_id_exists) {
        console.log("No employee exists with employee id: " + employee_id)
        res.status(409).json({ 'message': 'Invalid employee id!' });
        return;
    } else if (duplicate) {
        console.log(`Email already exists: ${email}`);
        return res.status(409).json({ "message": "This email is taken!"}); // Conflict
    }
    // console.log("Account not found...");
    // // find the employee with matching email
    // console.log("getting employee");
    // const employee = await employeeAccountController.getByEmail( email );
    // console.log(`THIS IS THE FOUND REGISTER EMPLOYEE EMAIL: ${employee}`);
    // if (!employee) return res.status(400).json({ 'message': `No employee exists with email: ${email}`});
    console.log("xxx");
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed Password: ${hashedPassword}...`);
        // create and store new account
        // const result = new Employee_Account(email, hashedPassword, "A");
        const result = await employeeAccountController.create({
            "email": email,
            "employee_id": employee_id,
            "password": hashedPassword
        })

        // TODO: Return error if account exists for employee_id

        res.status(201).json({ 'success': `New Account Created for ${email}!` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err });
    }
}

module.exports = { handleNewEmployee_Account };