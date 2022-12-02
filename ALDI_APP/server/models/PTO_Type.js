'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PTO_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PTO_Type.init({
    pto_type_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    pto_type: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'PTO_Type',
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'pto_type'
  });
  return PTO_Type;
};