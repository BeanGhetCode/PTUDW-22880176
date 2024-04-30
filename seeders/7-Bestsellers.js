'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let items = [{
      "productId": 1,
    }, {
      "productId": 9,
    }, {
      "productId": 4,
    },  {
      "productId": 16,
    },  {
      "productId": 7,
    }, {
      "productId": 5,
    }, {
      "productId": 12,
    }];
    items = items.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.productId === value.productId 
      ))
    );
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Bestsellers', items, {});

  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bestsellers', null, {});
  }
};
