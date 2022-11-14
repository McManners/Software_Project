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
    supervisor_id: { type: DataTypes.INTEGER, allowNull: true },
    date_from: { type: DataTypes.DATE, allowNull: true },
    date_to: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
    request_note: { type: DataTypes.TEXT, allowNull: true },
    response_note: { type: DataTypes.TEXT, allowNull: true },
  }, {
    sequelize,
    modelName: 'Ticket',
    underscored: true,
    freezeTableName: true,
    tableName: 'ticket'
  });
//   Ticket.associate = function (models) {
    // Ticket.hasMany(models.Ticket_Date_Range, {
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    //   foreignKey: {
    //     name: 'ticket_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //   },
    // });
    // Ticket.hasOne(models.Employee, {
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //     foreignKey: {
    //       name: 'employee_id',
    //       type: DataTypes.INTEGER,
    //       allowNull: false,
    //     },
    //   });
    // }

  // Add a custom `addScopes` function to call after initializing all models in `index.js`
//   Ticket.addScopes = function (models) {
    // Ticket.addScope('defaultScope', {
    //   include: [
    //     {
    //       model: models.Ticket_Date_Range,
    //     },
    //   ],
    // });
//   };

  return Ticket;
};