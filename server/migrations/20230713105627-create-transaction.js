'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productID: {
        type: Sequelize.STRING
      },
      productName: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      customerName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        }
      },
      transactionDate: {
        type: Sequelize.DATE
      },
      createBy: {
        type: Sequelize.STRING
      },
      createOn: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};