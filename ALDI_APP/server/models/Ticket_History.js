'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket_History.init({
    ticket_history_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    ticket_id: { type: DataTypes.INTEGER, allowNull: false },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: false },
    pto_type_id: { type: DataTypes.INTEGER, allowNull: false },
    request_note: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    response_note: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    submit_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.TEXT, allowNull: false, defaultValue: "PENDING" }
  }, {
    sequelize,
    modelName: 'Ticket_History',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    tableName: 'ticket_history'
  });
  Ticket_History.associate = function (models) {
    Ticket_History.hasMany(models.Ticket_Date_Range, {
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
    Ticket_History.hasOne(models.Employee, {
            foreignKey: {
              name: 'employee_id',
              field: 'employee_id'
            },
            sourceKey: 'employee_id'
        });
        
    }

//   Add a custom `addScopes` function to call after initializing all models in `index.js`
  Ticket_History.addScopes = function (models) {
    Ticket_History.addScope('defaultScope', {
        include: [
            models.Ticket_Date_Range,
            models.Employee
        ],
      attributes: { exclude: ['updatedAt'] } // lets include createdAt for now, so we know when the ticket was submitted...
    });
  };

  return Ticket_History;
};