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
    supervisor_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    request_note: { type: DataTypes.STRING, allowNull: true },
    response_note: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Ticket',
    underscored: true,
    freezeTableName: true,
  });
  return Ticket;
};