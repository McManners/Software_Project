const bcrypt = require('bcrypt');
const db = require('../models/index');

const handleNewAccount = async (req, res) => {  
    const { email, password, employee_id } = req.body;
    if (!email || !password || !employee_id) {
        return res.status(400).json({ 'message': 'Email, Employee ID, and Password are required.' }); // TODO: Client-side check missing input
    }
    const duplicate_email = await db.Account.findOne({ where: { email: email }});
    const duplicate_employee_id = await db.Account.findOne({ where: { employee_id: employee_id } });
    console.log(duplicate_employee_id); // TODO: Check this...might be joining employee and account tables wrong
    console.log("2");
    const employee_id_exists = await db.Employee.findOne({ where: { employee_id: employee_id } });
    console.log("3"); // TODO: Fix this to controller...
    if (duplicate_employee_id) {
        console.log(`Account already exists for id: ${employee_id}`);
        return res.status(409).json({ "message": `This employee id has an account!`})
    } else if (!employee_id_exists) {
        console.log("No employee exists with employee id: " + employee_id)
        return res.status(409).json({ 'message': 'Invalid employee id!' });
    } else if (duplicate_email) {
        console.log(`Email already exists: ${email}`);
        return res.status(409).json({ "message": "This email is taken!"}); // Conflict
    }
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed Password: ${hashedPassword}...`);
        const result = new db.Account({
            email: email,
            employee_id: employee_id,
            password: hashedPassword
        });
        result.save();

        res.status(201).json({ 'success': `New account created for ${email}!` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err });
    }
}

module.exports = { handleNewAccount };