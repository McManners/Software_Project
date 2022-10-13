'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee_Account.init({
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Employee_Account',
    underscored: true,
    freezeTableName: true,
  });
  return Employee_Account;
};