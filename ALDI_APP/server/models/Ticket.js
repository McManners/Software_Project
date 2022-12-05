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
    eid: { type: DataTypes.INTEGER, allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: false },
    pto_type_id: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
    request_note: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
    response_note: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
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
      },
    });
    Ticket.hasOne(models.Employee, {
        foreignKey: {
          name: 'eid'
        },
        sourceKey: 'eid'
    });
    Ticket.hasOne(models.Employee.scope('employeeName'), {
        foreignKey: {
          name: 'eid'
        },
        sourceKey: 'eid',
        as: 'employeeData'
    });
    Ticket.hasOne(models.Employee, {
        foreignKey: {
          name: 'eid',
        },
        sourceKey: 'leader_id'
    });
    Ticket.hasOne(models.PTO_Type.scope('ptoName'), {
        foreignKey: {
          name: 'pto_type_id'
        },
        sourceKey: 'pto_type_id',
        as: 'PTO_Type'
      });
    }

//   Add a custom `addScopes` function to call after initializing all models in `index.js`
  Ticket.addScopes = function (models) {
    Ticket.addScope('defaultScope', {
      include: [
        {
          model: models.Ticket_Date_Range,
        },
        {
            association: 'employeeData',
        },
        {
            association: 'PTO_Type'
        }

      ],
      attributes: { exclude: ['updatedAt', 'pto_type_id'] } // lets include createdAt for now, so we know when the ticket was submitted...
    });
  };

  return Ticket;
};