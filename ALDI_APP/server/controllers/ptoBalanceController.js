const db = require('../models/index');
const jwt = require('jsonwebtoken');

const getPTOBalance = async (req, res) => {
    console.log('getting ptobalance for: ' + req.employee_id);
    const employee_id = req.employee_id;
    const employee = await db.Employee.findByPk(employee_id);
    let bracket = {};
    const years_experience = Math. abs(Math. round((new Date().getTime() - new Date(employee.hire_date).getTime() ) / (1000 * 60 * 60 * 24) / 365.25));
    let pto = await db.PTO_Balance.findOne({ where: { employee_id: employee_id } });
    await db.Accrual_Bracket.findAll({ where: { employee_type_id: employee.employee_type_id }, order: [['number_of_years', 'ASC']] })
    .then(entries => entries.forEach(entries => {
        if (entries.number_of_years < years_experience)
            bracket = entries;
    }));
    if (pto) {
        console.log('old pto exists');
        const started_date = new Date(pto.createdAt);
        const is_new_date = Math.abs(new Date().getTime() - started_date.getTime()) / (1000 * 60 * 60 * 24) / 365.25;
        if (is_new_date > 1) {
            console.log('pto is old');
            console.log("changing");
            await db.PTO_Balance_History.create({
                employee_id: pto.employee_id,
                employee_type_id: pto.employee_type_id,
                accrual_bracket_id: pto.accrual_bracket_id,
                vacation_taken: pto.vacation_taken,
                personal_taken: pto.personal_taken,
                sick_taken: pto.sick_taken,
                created_at: pto.createdAt
            });
            console.log('destroying pto');
            await pto.destroy();
            await db.PTO_Balance.create({
                employee_id: employee_id,
                employee_type_id: employee.employee_type_id,
                accrual_bracket_id: bracket.accrual_bracket_id,
                vacation_taken: 0,
                personal_taken: 0,
                sick_taken: 0
            });
        }
        
    }
    pto = await db.PTO_Balance.findOne({ where: { employee_id: employee_id } });
    if (!pto) {
        console.log("cant find pto");
        await db.PTO_Balance.create({
            employee_id: employee_id,
            employee_type_id: employee.employee_type_id,
            accrual_bracket_id: bracket.accrual_bracket_id,
            vacation_taken: 0,
            personal_taken: 0,
            sick_taken: 0
        });
    }
    // pto = await db.PTO_Balance.findOne({ where: { employee_id: employee_id } });
    // if (!pto) {
    //     console.log("cant find pto");
    //     await db.PTO_Balance.create({
    //         employee_id: employee_id,
    //         accrual_bracket_id: bracket.accrual_bracket_id,
    //         vacation_taken: 0,
    //         personal_taken: 0,
    //         sick_taken: 0
    //     });
    const x = await db.PTO_Balance.findOne({ where: { employee_id: employee_id } });
    res.status(200).json(x);
}

const getPTOBalanceTest = async (req, res) => {
    const employee_id = 1;
    const employee = await db.Employee.findByPk(employee_id);
    const pto_balance = await employee.getPtoBalance();
    // const years_experience = employee.hire_date 
    let bracket = {};
    const years_experience = Math. abs(Math. round((new Date().getTime() - new Date(employee.hire_date).getTime() ) / (1000 * 60 * 60 * 24) / 365.25));
    console.log(years_experience)
    let pto = await db.PTO_Balance.findOne({ where: { employee_id: employee_id } });
    await db.Accrual_Bracket.findAll({ where: { employee_type_id: employee.employee_type_id }, order: [['number_of_years', 'ASC']] })
    .then(entries => entries.forEach(entries => {
        if (entries.number_of_years < years_experience)
            bracket = entries;
    }));
    if (pto) {
        const started_date = new Date(pto.createdAt);
        const is_new_date = Math.abs(new Date().getTime() - started_date.getTime()) / (1000 * 60 * 60 * 24) / 365.25;
        if (is_new_date > 1) {
            console.log('pto is old');
            console.log("changing");
            await db.PTO_Balance_History.create({
                employee_id: pto.employee_id,
                employee_type_id: pto.employee_type_id,
                accrual_bracket_id: pto.accrual_bracket_id,
                vacation_taken: pto.vacation_taken,
                personal_taken: pto.personal_taken,
                sick_taken: pto.sick_taken,
                created_at: pto.createdAt
            })
            await db.PTO_Balance.create({
                employee_id: employee_id,
                employee_type_id: employee.employee_type_id,
                accrual_bracket_id: bracket.accrual_bracket_id,
                vacation_taken: 0,
                personal_taken: 0,
                sick_taken: 0
            });
        }
        
    }
    pto = await db.PTO_Balance.findOne({ where: { employee_id: employee_id } });
    if (!pto) {
        console.log("cant find pto");
        await db.PTO_Balance.create({
            employee_id: employee_id,
            employee_type_id: employee.employee_type_id,
            accrual_bracket_id: bracket.accrual_bracket_id,
            vacation_taken: 0,
            personal_taken: 0,
            sick_taken: 0
        });
    }
    const x = await db.PTO_Balance.findOne({ where: { employee_id: employee_id } });
    res.status(200).json(x);
}
const getEmployee = async (req, res) => {
    const employee = await db.Accrual_Bracket.findByPk(30);
    res.status(200).json(employee);
}

module.exports = { getPTOBalance, getPTOBalanceTest, getEmployee }