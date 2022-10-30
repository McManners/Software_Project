'use strict';
const {
  Model
} = require('sequelize');
const Employee = require('./Employee');
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
    employee_account_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Employee_Account',
    underscored: true,
    freezeTableName: true,
  });
  Employee_Account.associate = function (models) {
    Employee_Account.hasOne(models.Employee, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'employee_id',
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });
    };

  // Add a custom `addScopes` function to call after initializing all models in `index.js`
  Employee_Account.addScopes = function (models) {
    Employee_Account.addScope('defaultScope', {
      include: [
        {
          model: models.Employee,
        },
      ],
    });
}
  return Employee_Account;
};