'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accrual_Bracket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Accrual_Bracket.init({
    accrual_bracket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    number_of_years: { type: DataTypes.INTEGER, allowNull: false },
    employee_type_id: { type: DataTypes.INTEGER, allowNull: false },
    max_vacation_per_year: { type: DataTypes.INTEGER, allowNull: false },
    vacation_accrual_date: { type: DataTypes.STRING, allowNull: false },
    max_personal: { type: DataTypes.INTEGER, allowNull: false },
    personal_per_year: { type: DataTypes.INTEGER, allowNull: true },
    max_sick: { type: DataTypes.INTEGER, allowNull: false },
    sick_per_year: { type: DataTypes.INTEGER, allowNull: false },
    sick_accrual_date: { type: DataTypes.STRING, allowNull: true },
}, {
    sequelize,
    modelName: 'Accrual_Bracket',
    underscored: true,
    freezeTableName: true,
    tableName: "accrual_bracket"
  });
  Accrual_Bracket.associate = function (models) {
    Accrual_Bracket.belongsTo(models.PTO_Balance, {
      foreignKey: {
        name: 'accrual_bracket_id'
      },
    });
  }
  Accrual_Bracket.addScopes = function (models) {
    Accrual_Bracket.addScope('defaultScope', {
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    });
  };
  return Accrual_Bracket;
};