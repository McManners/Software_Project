'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PTO_Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PTO_Balance.init({
    pto_balance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    vacation_available: { type: DataTypes.INTEGER, allowNull: false },
    personal_available: { type: DataTypes.INTEGER, allowNull: false },
    sick_available: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'PTO_Balance',
    underscored: true,
    freezeTableName: true,
  });
  return PTO_Balance;
};