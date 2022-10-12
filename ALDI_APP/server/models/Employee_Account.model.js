const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        employee_id: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    
    const Employee = require('./Employee.model');
    Employee_Account.hasOne(Employee);
    Employee.belongsTo(Employee_Account);

    return sequelize.define('Employee_Account', attributes, options);
}