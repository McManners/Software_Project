// const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = new Sequelize('mysql::memory');

// class Employee extends Model {}

// Employee.init({
//     // Model attributes are defined here
//     employee_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
//     first_name: { type: DataTypes.STRING, allowNull: false },
//     last_name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false },
//     hire_date: { type: DataTypes.DATE, allowNull: false },
//     supervisor_id: { type: DataTypes.INTEGER, allowNull: true },
//     employee_type_id: { type: DataTypes.INTEGER, allowNull: false }
// },
// {
//   // Other model options go here
//   sequelize, // We need to pass the connection instance
//   modelName: 'Employee', // We need to choose the model name
//   freezeTableName: true
// });

// // the defined model is the class itself
// console.log(Employee === sequelize.models.Employee); // true
// module.exports = Employee;


const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        employee_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        hire_date: { type: DataTypes.DATE, allowNull: false },
        supervisor_id: { type: DataTypes.INTEGER, allowNull: true },
        employee_type_id: { type: DataTypes.INTEGER, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE, allowNull: false }
    };
    const options = {
        freezeTableName: true,
        timestamps: false,
        tableName: 'employee'
    }

    // const Employee_Type = require('./Employee_Type.model.');
    // Employee.hasOne(Employee_Type);
    // Employee_Type.belongsTo(Employee);

    // Employee.belongsTo(Ticket);
    // Ticket.hasOne(Employee);

    // Employee.belongsTo(PTO_Balance);
    // PTO_Balance.hasOne(Employee);

    // Employee.belongsTo(Employee_Account);
    // Employee_Account.hasOne(Employee);

    return sequelize.define('Employee', attributes, options);
}