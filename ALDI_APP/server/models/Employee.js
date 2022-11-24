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
    eid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false,},
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    hire_date: { type: DataTypes.DATE, allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: true },
    employee_type_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Employee',
    underscored: true,
    freezeTableName: true,
    tableName: 'employee',
    timestamps: true
  });

  Employee.associate = function (models) {
    Employee.hasMany(models.Ticket, {
      onDelete: 'CASCADE', // default for belongsToMany
      onUpdate: 'CASCADE', // default for belongsToMany
      foreignKey: {
        name: 'eid',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      as: 'employeeTickets'
    });
    Employee.hasMany(models.Ticket, {
        foreignKey: {
          name: 'leader_id',
        },
        sourceKey: 'eid',
        as: 'leaderTickets'
    });
  }
    // Add a custom `addScopes` function to call after initializing all models in `index.js`
    Employee.addScopes = function (models) {
        Employee.addScope('employeeTicketScope', {
          include: [
            {
              model: models.Ticket
            },
          ],
          attributes: { exclude: ['updatedAt', 'createdAt'] }
        });
        Employee.addScope('defaultScope', {
            attributes: { exclude: ['updatedAt', 'createdAt'] }
        });
        Employee.addScope('employeeName', {
            attributes: { exclude: ['eid', 'email', 'hire_date', 'employee_type_id', 'leader_id', 'updatedAt', 'createdAt'] }
        });
      };
  return Employee;
};