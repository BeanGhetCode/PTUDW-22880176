'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bestseller extends Model {
   
    static associate(models) {
        Bestseller.belongsTo(models.Product, {foreignKey:'productId'});
    }
  }
  Bestseller.init({
  }, {
    sequelize,
    modelName: 'Bestseller',
  });
  return Bestseller;
};