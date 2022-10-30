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
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false,},
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    hire_date: { type: DataTypes.DATE, allowNull: false },
    supervisor_id: { type: DataTypes.INTEGER, allowNull: true },
    employee_type_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Employee',
    underscored: true,
    freezeTableName: true,
  });

  Employee.associate = function (models) {
    Employee.hasMany(models.Ticket, {
      through: 'employee_id',
      onDelete: 'CASCADE', // default for belongsToMany
      onUpdate: 'CASCADE', // default for belongsToMany
      foreignKey: {
        name: 'employee_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }
    // Add a custom `addScopes` function to call after initializing all models in `index.js`
    Employee.addScopes = function (models) {
        Employee.addScope('defaultScope', {
          include: [
            {
              model: models.Ticket,
            },
          ],
        });
      };
  return Employee;
};