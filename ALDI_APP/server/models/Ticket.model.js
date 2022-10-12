const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        employee_id: { type: DataTypes.INTEGER, allowNull: false },
        supervisor_id: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.BOOLEAN, allowNull: false }
    };


    const Employee = require('./Employee.model');
    Ticket.hasOne(Employee);
    Employee.belongsTo(Ticket);

    // Ticket.belongsTo(Ticket_Date_Range);
    // Ticket_Date_Range.hasOne(Ticket);

    // Ticket.hasOne(Employee);
    // Employee.belongsTo(Ticket);

    return sequelize.define('Ticket', attributes, options);
}