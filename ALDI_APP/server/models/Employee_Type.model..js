const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        employee_type: { type: DataTypes.INTEGER, allowNull: false },
        default_vacation_days: { type: DataTypes.INTEGER, allowNull: false },
        default_personal_days: { type: DataTypes.INTEGER, allowNull: false },
        default_sick_days: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
        },
        scopes: {
        }
    };

    return sequelize.define('Employee_Type', attributes, options);
}