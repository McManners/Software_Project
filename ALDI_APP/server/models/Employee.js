'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    eid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false,},
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    hire_date: { type: DataTypes.DATE, allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: true },
    employee_type_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Employee',
    underscored: true,
    freezeTableName: true,
    tableName: 'employee',
    timestamps: true
  });

//   Employee.associate = function (models) {
//     Employee.belongsToMany(models.Ticket, {
//       through: 'eid',
//       onDelete: 'CASCADE', // default for belongsToMany
//       onUpdate: 'CASCADE', // default for belongsToMany
//       foreignKey: {
//         name: 'eid',
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     });
//   }
//     // Add a custom `addScopes` function to call after initializing all models in `index.js`
//     Employee.addScopes = function (models) {
//         Employee.addScope('defaultScope', {
//           include: [
//             {
//               model: models.Ticket,
//             },
//           ],
//         });
//       };
  return Employee;
};