'use strict';
const {
  Model
} = require('sequelize');
const Employee = require('./Employee');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    account_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    eid: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Account',
    underscored: true,
    freezeTableName: true,
    tableName: "account"
  });
//   Account.associate = function (models) {
//     Account.hasOne(models.Employee, {
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE',
//         foreignKey: {
//           name: 'eid',
//           type: DataTypes.INTEGER,
//           allowNull: false,
//         },
//         sourceKey: 'eid'
//       });
//     };

//   // Add a custom `addScopes` function to call after initializing all models in `index.js`
//   Account.addScopes = function (models) {
//     Account.addScope('defaultScope', {
//       include: models.Employee
//     });
// }
  return Account;
};