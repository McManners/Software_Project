const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        employee_id: { type: DataTypes.INTEGER, allowNull: false },
        vacation_available: { type: DataTypes.INTEGER, allowNull: false },
        personal_available: { type: DataTypes.INTEGER, allowNull: false },
        sick_available: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
        },
        scopes: {
        }
    };

    PTO_Balance.hasOne(Employee);
    Employee.belongsTo(PTO_Balance);
    
    return sequelize.define('PTO_Balance', attributes, options);
}