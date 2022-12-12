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
    ticket_id: { type: DataTypes.INTEGER, allowNull: false },
    pto_type_id: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'PTO',
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'pto'
  });
  PTO.associate = function (models) {
    // PTO.hasOne(models.PTO_Type, {
    //     foreignKey: { 
    //         name: 'pto_type_id',
    //         field: 'pto_type_id'
    //     },
    //     sourceKey: 'pto_type_id'
    // });
    // PTO.hasOne(models.Employee, {
    //     foreignKey: { 
    //         name: 'employee_id',
    //         field: 'employee_id'
    //     },
    //     sourceKey: 'employee_id'
    // });
    
    PTO.hasOne(models.Ticket_History, {
        foreignKey: { 
            name: 'ticket_id',
            field: 'ticket_id'
        },
        sourceKey: 'ticket_id'
    });
  }
    
  PTO.addScopes = function (models) {
    PTO.addScope('defaultScope', {
        include: [
            models.Ticket_History
        ],
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    });
}
  return PTO;
};