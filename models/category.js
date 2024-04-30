'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {

    static associate(models) {
      Brand.hasMany(models.Product, {foreignKey:'categoryId'});

    }
  }
  Brand.init({
    name: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Category',
  });
  return Brand;
};