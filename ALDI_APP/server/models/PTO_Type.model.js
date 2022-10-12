const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        pto_type: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
        },
        scopes: {
        }
    };

    return sequelize.define('PTO_Type', attributes, options);
}