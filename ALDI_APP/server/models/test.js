'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    employee_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    hire_date: { type: DataTypes.DATE, allowNull: false },
    supervisor_id: { type: DataTypes.INTEGER, allowNull: true },
    employee_type_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false }
  }, {
    sequelize,
    modelName: 'Employee',
    freezeTableName: true,
    timestamps: false,
  });
  return Employee;
};