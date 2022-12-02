'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket_Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket_Response.init({
    ticket_response_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    ticket_id: { type: DataTypes.INTEGER, allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: false },
    response_type:  { type: DataTypes.INTEGER, allowNull: false },
    response:  { type: DataTypes.INTEGER, allowNull: true },
    // created_at:  { type: DataTypes.INTEGER, allowNull: false },
    // updated_at:  { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Ticket_Response',
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'ticket_response'
  });
  return Ticket_Response;
};