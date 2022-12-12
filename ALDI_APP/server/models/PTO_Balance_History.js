'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PTO_Balance_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PTO_Balance_History.init({
    pto_balance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    employee_type_id: { type: DataTypes.INTEGER, allowNull: false },
    accrual_bracket_id: { type: DataTypes.INTEGER, allowNull: true },
    vacation_taken: { type: DataTypes.INTEGER, allowNull: false },
    personal_taken: { type: DataTypes.INTEGER, allowNull: false },
    sick_taken: { type: DataTypes.INTEGER, allowNull: false }
  }, 
  {
    sequelize,
    modelName: 'PTO_Balance_History',
    underscored: true,
    freezeTableName: true,
    tableName: 'pto_balance_history'
  });
  PTO_Balance_History.associate = function (models) {
    PTO_Balance_History.hasOne(models.Accrual_Bracket, {
        foreignKey: {
            name: 'accrual_bracket_id',
            field: 'accrual_bracket_id'
        },
        sourceKey: 'accrual_bracket_id'
      });
      PTO_Balance_History.hasOne(models.Employee, {
        foreignKey: {
            name: 'employee_id',
            field: 'employee_id'
        },
        sourceKey: 'employee_id'
      });
    };
    PTO_Balance_History.addScopes = function (models) {
        PTO_Balance_History.addScope('defaultScope', {
            include: [
                {
                    model: models.Accrual_Bracket
                }
            ],
            attributes: { exclude: ['updatedAt'] }
        });
    };
  return PTO_Balance_History;
};