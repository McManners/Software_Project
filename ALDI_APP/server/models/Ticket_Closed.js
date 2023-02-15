'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket_Closed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket_Closed.init({
    ticket_closed_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    ticket_id: { type: DataTypes.INTEGER, allowNull: false },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: false },
    pto_type_id: { type: DataTypes.INTEGER, allowNull: false },
    request_note: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    response_note: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    submit_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.TEXT, allowNull: false, defaultValue: "DENIED" }
  }, {
    sequelize,
    modelName: 'Ticket_Closed',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    tableName: 'ticket_closed'
  });
  Ticket_Closed.associate = function (models) {
    Ticket_Closed.hasMany(models.Ticket_Date_Range, {
      foreignKey: {
        name: 'ticket_id',
        field: 'ticket_id'
      },
      sourceKey: 'ticket_id'
    });
    Ticket_Closed.hasMany(models.Ticket_History, {
      foreignKey: {
        name: 'ticket_id',
        field: 'ticket_id'
      },
      sourceKey: 'ticket_id'
    });
    // Ticket_History.hasOne(models.Employee, {
    //     foreignKey: {
    //       name: 'employee_id'
    //     }
    // });
    // Ticket_History.hasOne(models.Employee.scope('employeeName'), {
    //     foreignKey: {
    //       name: 'employee_id'
    //     },
    //     as: 'employeeData'
    // });
    // Ticket_History.hasOne(models.Employee, {
    //     sourceKey: 'employee_id'
    // });
    // Ticket_History.hasOne(models.PTO_Type, {
    //     sourceKey: 'pto_type_id',
    //     as: 'PTO_Type'
    // });
    // Ticket_History.hasMany(models.Ticket_Date_Range);
    // Ticket_History.hasOne(models.PTO, {
    //     foreignKey: 'ticket_id'
    // });
    // Ticket_History.hasOne(models.Employee, {
    //     sourceKey: 'leader_id'
    // });
    Ticket_Closed.hasOne(models.Employee, {
            foreignKey: {
              name: 'employee_id',
              field: 'employee_id'
            },
            sourceKey: 'employee_id'
        });
        
    }

//   Add a custom `addScopes` function to call after initializing all models in `index.js`
  Ticket_Closed.addScopes = function (models) {
    Ticket_Closed.addScope('defaultScope', {
        include: [
            models.Ticket_Date_Range,
            models.Employee,
            models.Ticket_History
            // models.Ticket_History.scope('ticketHistories')
        ],
      attributes: { exclude: ['updatedAt'] } // lets include createdAt for now, so we know when the ticket was submitted...
    });
  };

  return Ticket_Closed;
};