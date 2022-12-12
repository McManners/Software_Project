'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket_Date_Range extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   this.belongsTo(models.Ticket, { foreignKey: 'ticket_id' });
    }
  }
  Ticket_Date_Range.init({
    ticket_date_range_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    requested_date: { type: DataTypes.DATE, allowNull: false },
    ticket_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Ticket_Date_Range',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    tableName: 'ticket_date_range'
  });
    Ticket_Date_Range.associate = function (models) {
        // Ticket_Date_Range.hasMany(models.Ticket_History, {
        //     foreignKey: { 
        //         name: 'ticket_id',
        //         field: 'ticket_id'
        //     },
        //     sourceKey: 'ticket_id'
        // });
        // Ticket_Date_Range.hasOne(models.Ticket_History, {
        //     foreignKey: { 
        //         name: 'ticket_id',
        //         field: 'ticket_id'
        //     },
        //     sourceKey: 'ticket_id'
        // });
    }
  Ticket_Date_Range.addScopes = function (models) {
    Ticket_Date_Range.addScope('defaultScope', {
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    });
  };
  return Ticket_Date_Range;
};