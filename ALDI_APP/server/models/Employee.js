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
    leader_id: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'Employee',
    underscored: true,
    freezeTableName: true,
    tableName: 'employee',
    timestamps: true
  });

  Employee.associate = function (models) {
    // Employee.hasMany(models.Ticket, {
    //     foreignKey: {
    //         name: 'employee_id'
    //     },
    //     sourceKey: 'employee_id',
    //     as: 'employeeTickets'
    // });
    Employee.hasMany(models.Ticket, {
        foreignKey: {
            name: 'leader_id',
            field: 'leader_id'
        },
        sourceKey: 'employee_id',
        as: 'leaderTickets'
    });
    Employee.hasMany(models.Ticket, {
        foreignKey: {
            name: 'employee_id',
            field: 'employee_id'
        },
        sourceKey: 'employee_id'
    });
    Employee.hasMany(models.Ticket_History, {
        foreignKey: {
            name: 'employee_id',
            field: 'employee_id'
        },
        sourceKey: 'employee_id',
        as: 'ticketHistory'
    });
    Employee.hasMany(models.Ticket, {
        foreignKey: {
            name: 'employee_id',
            field: 'employee_id'
        },
        sourceKey: 'employee_id',
        as: 'pendingTickets'
    });
    // Employee.hasMany(models.Ticket_History, {
    //     foreignKey: {
    //         name: 'employee_id'
    //     },
    //     sourceKey: 'employee_id',
    //     as: 'employeeTicketHistory'
    // });
    // Employee.hasMany(models.Ticket_History, {
    //     foreignKey: {
    //         name: 'leader_id'
    //     },
    //     sourceKey: 'employee_id',
    //     as: 'leaderTicketHistory'
    // });
    // Employee.hasOne(models.Employee, {
    //     foreignKey: 'leader_id',
    //     sourceKey: 'employee_id',
    //     as: 'leader'
    // });
    Employee.hasOne(models.PTO_Balance, {
        foreignKey: {
          name: 'employee_id',
        },
        as: 'ptoBalance'
    });
    Employee.hasOne(models.PTO_Balance_History, {
        foreignKey: {
          name: 'employee_id',
        },
        as: 'ptoBalanceHistory'
    });
    Employee.hasOne(models.Account, {
        foreignKey: {
          name: 'employee_id',
        },
        as: 'account'
    });
    Employee.hasMany(models.Employee, {
        foreignKey: {
          name: 'leader_id',
        },
        sourceKey: 'employee_id',
        as: 'leaderEmployees'
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
            attributes: { exclude: ['employee_id', 'email', 'hire_date', 'employee_type_id', 'leader_id', 'updatedAt', 'createdAt'] }
        });
      };
  return Employee;
};