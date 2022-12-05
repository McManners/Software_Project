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
    // pto_balance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    eid: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    emp_id: { type: DataTypes.INTEGER, allowNull: false },
    accrual_bracket_id: { type: DataTypes.INTEGER, allowNull: true },
    vacation_taken: { type: DataTypes.INTEGER, allowNull: false },
    personal_taken: { type: DataTypes.INTEGER, allowNull: false },
    sick_taken: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false }
  }, {
    sequelize,
    modelName: 'PTO_Balance',
    underscored: true,
    freezeTableName: true,
    tableName: 'pto_balance'
  });
  PTO_Balance.associate = function (models) {
    PTO_Balance.hasOne(models.Accrual_Bracket, {
      foreignKey: {
        name: 'accrual_bracket_id'
      },
      sourceKey: 'accrual_bracket_id'
    });
    PTO_Balance.hasOne(models.Employee, {
        foreignKey: {
          name: 'eid'
        },
        sourceKey: 'eid'
      });
    };
  PTO_Balance.addScopes = function (models) {
    PTO_Balance.addScope('defaultScope', {
        include: [
            {
                model: models.Accrual_Bracket
            }
        ],
        attributes: { exclude: ['updatedAt'] }
      });
  };
  return PTO_Balance;
};