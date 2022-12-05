const db = require('../models/index');
const jwt = require('jsonwebtoken');

const getPTOBalance = async (req, res) => {
    // const cookies = req.cookies;
    // console.log(cookies);
    // if (!cookies.jwt) return res.status(204) // No content
    // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    // res.clearCookie('logged');
    // const foundAccount = await db.Account.findOne({ where: { refresh_token: cookies.jwt } });
    // foundAccount.refresh_token = "";
    // foundAccount.save();
    
    // res.status(201).json({ message: 'Logged out' });
    const eid = req.eid;
    const employee = await db.Employee.findByPk(eid);
    const pto_balance = await employee.getPtoBalance();
    // const years_experience = employee.hire_date 
    let bracket = {};
    const years_experience = Math. abs(Math. round((new Date().getTime() - new Date(employee.hire_date).getTime() ) / (1000 * 60 * 60 * 24) / 365.25));
    console.log(years_experience)
    let pto = await db.PTO_Balance.findOne({ where: { emp_id: eid, is_active: 1 } });
    await db.Accrual_Bracket.findAll({ where: { employee_type_id: employee.employee_type_id }, order: [['number_of_years', 'ASC']] })
    .then(entries => entries.forEach(entries => {
        if (entries.number_of_years < years_experience)
            bracket = entries;
    }));
    if (pto) {
        const started_date = new Date(pto.createdAt);
        console.log(pto.createdAt);
        console.log(started_date)
        const is_new_date = Math.abs(new Date().getTime() - started_date.getTime()) / (1000 * 60 * 60 * 24) / 365.25;
        console.log(is_new_date);
        if (is_new_date > 1) {
            console.log("changing")
            pto.is_active = 0
            pto.save();
            await db.PTO_Balance.create({
                emp_id: eid,
                accrual_bracket_id: bracket.accrual_bracket_id,
                vacation_taken: 0,
                personal_taken: 0,
                sick_taken: 0,
                is_active: 1
            });
        }
        
    }
    pto = await db.PTO_Balance.findOne({ where: { emp_id: eid, is_active: 1 } });
    if (!pto) {
        console.log("yeah");
        await db.PTO_Balance.create({
            emp_id: eid,
            accrual_bracket_id: bracket.accrual_bracket_id,
            vacation_taken: 0,
            personal_taken: 0,
            sick_taken: 0,
            is_active: 1
        });
    }
    const x = await db.PTO_Balance.findOne({ where: { emp_id: eid, is_active: 1 } });
    console.log(x);
    res.status(200).json(x);
}
const getEmployee = async (req, res) => {
    const employee = await db.Accrual_Bracket.findByPk(30);
    res.status(200).json(employee);
}

module.exports = { getPTOBalance, getEmployee }