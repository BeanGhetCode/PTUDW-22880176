'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let items = [{
      "productId": 15,
      "tagId": 2
    }, {
      "productId": 5,
      "tagId": 1
    }, {
      "productId": 4,
      "tagId": 5
    },  {
      "productId": 16,
      "tagId": 5
    },  {
      "productId": 7,
      "tagId": 1
    }, {
      "productId": 5,
      "tagId": 4
    }, {
      "productId": 12,
      "tagId": 1
    },  {
      "productId": 16,
      "tagId": 3
    },  {
      "productId": 9,
      "tagId": 4
    },   {
      "productId": 14,
      "tagId": 2
    },  {
      "productId": 14,
      "tagId": 5
    }, {
      "productId": 10,
      "tagId": 4
    }, {
      "productId": 9,
      "tagId": 5
    }, {
      "productId": 1,
      "tagId": 3
    }, {
      "productId": 13,
      "tagId": 3
    },  {
      "productId": 12,
      "tagId": 2
    }, {
      "productId": 11,
      "tagId": 4
    }, {
      "productId": 3,
      "tagId": 1
    }];
    items = items.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.productId === value.productId && t.tagId === value.tagId
      ))
    );
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('ProductTags', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductTags', null, {});
  }
};
