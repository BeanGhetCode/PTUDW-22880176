'use strict';
const Sequelize = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, sequelize) {
   let data = [{
    name: 'Organic'
   },{
    name: 'Fresh'
   },{
    name: 'Sale'
   },{
    name: 'Discount'
   },{
    name: 'Expired'
   },
  ];
  data.forEach( item =>{
    item.createdAt = Sequelize.literal('NOW()'); 
    item.updatedAt = Sequelize.literal('NOW()');
  })
  await queryInterface.bulkInsert('Tags',data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags',null, {});
  }
};
