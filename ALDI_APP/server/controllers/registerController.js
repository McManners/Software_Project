const Employee_Account = require('../models/Employee_Account');
const employeeAccountController = require('./employeeAccountController');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

const handleNewEmployee_Account = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    // TODO: check for duplicate employee email in the database
    const duplicate = await employeeAccountController.getByEmail(email);
    console.log(`${email} is a duplicate account!`);
    if (duplicate) return res.sendStatus(409); // Conflict
    // console.log("Account not found...");
    // // find the employee with matching email
    // console.log("getting employee");
    // const employee = await employeeAccountController.getByEmail( email );
    // console.log(`THIS IS THE FOUND REGISTER EMPLOYEE EMAIL: ${employee}`);
    // if (!employee) return res.status(400).json({ 'message': `No employee exists with email: ${email}`});

    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed Password: ${hashedPassword}...`);
        // create and store new account
        // const result = new Employee_Account(email, hashedPassword, "A");
        const result = await employeeAccountController.create({
            "email": email,
            "password": hashedPassword
        })

        res.status(201).json({ 'success': `New Account Created for ${email}!` });
    } catch (err) {
        res.status(500).json({ 'message': err });
    }
}

module.exports = { handleNewEmployee_Account };