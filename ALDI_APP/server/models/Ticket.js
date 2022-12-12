'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    ticket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: false },
    pto_type_id: { type: DataTypes.INTEGER, allowNull: false },
    request_note: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    response_note: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    submit_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.TEXT, allowNull: false, defaultValue: "PENDING" }
  }, {
    sequelize,
    modelName: 'Ticket',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    tableName: 'ticket'
  });
  Ticket.associate = function (models) {
    Ticket.hasMany(models.Ticket_Date_Range, {
        foreignKey: { 
            name: 'ticket_id',
            field: 'ticket_id'
        },
        sourceKey: 'ticket_id'
    });
    // Ticket.hasOne(models.Employee, {
    //     sourceKey: 'employee_id'
    // });
    // Ticket.hasOne(models.PTO_Type, {
    //     foreignKey: {
    //         name: 'pto_type_id',
    //         field: 'pto_type_id'
    //     },
    //     sourceKey: 'pto_type_id',
    //     as: 'PTO_Type'
    // });
    // Ticket.hasOne(models.Employee, {
    //     sourceKey: 'leader_id'
    // });
    // Ticket.hasMany(models.Ticket_Date_Range, {
    //     sourceKey: 'ticket_id'
    // });
    // Ticket.hasOne(models.Employee, {
    //     foreignKey: {
    //       name: 'employee_id'
    //     }
    // });
    Ticket.hasOne(models.Employee, {
        foreignKey: {
          name: 'employee_id',
          field: 'employee_id'
        },
        sourceKey: 'employee_id'
    });
    // Ticket.hasOne(models.Employee, {
    //     foreignKey: {
    //       name: 'leader_id',
    //     },
    //     sourceKey: 'employee_id'
    // });
    
    // Ticket.hasOne(models.PTO_Type.scope('ptoName'), {
    //     foreignKey: {
    //       name: 'pto_type_id'
    //     },
    //     as: 'PTO_Type'
    //   });
    }

//   Add a custom `addScopes` function to call after initializing all models in `index.js`
  Ticket.addScopes = function (models) {
    Ticket.addScope('defaultScope', {
      include: [
          models.Ticket_Date_Range,
          models.Employee
      ],
      attributes: { exclude: ['updatedAt', 'created_at'] } // lets include createdAt for now, so we know when the ticket was submitted...
    });
  };

  return Ticket;
};