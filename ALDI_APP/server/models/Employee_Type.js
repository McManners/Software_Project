'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee_Type.init({
    employee_type_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    employee_type: { type: DataTypes.INTEGER, allowNull: false },
    default_vacation_days: { type: DataTypes.INTEGER, allowNull: false },
    default_personal_days: { type: DataTypes.INTEGER, allowNull: false },
    default_sick_days: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Employee_Type',
    underscored: true,
    freezeTableName: true,
    tableName: "employee_type"
  });
  
  Employee_Type.addScopes = function (models) {
    Employee_Type.addScope('defaultScope', {
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    });
  };
  return Employee_Type;
};