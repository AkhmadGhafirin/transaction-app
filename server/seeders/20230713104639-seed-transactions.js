'use strict';
const data = require('../viewData.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const insertData = data?.data?.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Transactions', insertData, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Transactions', null, {})
  }
};
