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
    employee_type: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Employee_Type',
    underscored: true,
    freezeTableName: true,
    tableName: "employee_type"
  });
  Employee_Type.associate = function (models) {
    Employee_Type.hasOne(models.Employee, {
        foreignKey: 'employee_type_id'
    });
    Employee_Type.hasOne(models.PTO_Balance, {
        foreignKey: 'employee_type_id'
    });
    Employee_Type.hasOne(models.PTO_Balance_History, {
        foreignKey: 'employee_type_id'
    });
    Employee_Type.hasOne(models.Accrual_Bracket, {
        foreignKey: 'employee_type_id'
    });
}
  
  Employee_Type.addScopes = function (models) {
    Employee_Type.addScope('defaultScope', {
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    });
  };
  return Employee_Type;
};