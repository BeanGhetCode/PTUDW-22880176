'use strict';
const Sequelize = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [{
      name: 'Vegetables'
    },{
      name: 'Fruits'
    },{
      name: 'Bread'
    },{
      name: 'Meat'
    }
    ];
  data.forEach( item =>{
    item.createdAt = Sequelize.literal('NOW()');
    item.updatedAt = Sequelize.literal('NOW()');
  })
  await queryInterface.bulkInsert('Categories',data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',null, {});
  }
};


