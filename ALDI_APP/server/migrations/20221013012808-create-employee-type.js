'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_type', {
      employee_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      default_vacation: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      default_personal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      default_sick: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_type');
  }
};