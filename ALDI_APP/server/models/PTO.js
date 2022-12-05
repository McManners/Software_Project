'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PTO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PTO.init({
    pto_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    eid: { type: DataTypes.INTEGER, allowNull: false },
    ticket_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'PTO',
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'pto'
  });
  
  PTO.addScopes = function (models) {
    PTO.addScope('defaultScope', {
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    });
  };
  return PTO;
};