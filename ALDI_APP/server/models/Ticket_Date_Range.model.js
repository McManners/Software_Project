const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        ticket_id: { type: DataTypes.INTEGER, allowNull: false },
        start_date: { type: DataTypes.DATE, allowNull: false },
        end_date: { type: DataTypes.DATE, allowNull: false }
    };
    
    const Ticket = require('./Ticket.model');
    Ticket.hasMany(Ticket_Date_Range);
    Ticket_Date_Range.belongsTo(Ticket);

    // Ticket_Date_Range.hasMany(Ticket);
    // Ticket.belongsTo(Ticket_Date_Range);

    return sequelize.define('Ticket_Date_Range', attributes, options);
}