'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    
    static associate(models) {
      Tag.belongsToMany(models.Product, {through: 'ProductTag', foreignKey: 'tagId', otherKey: 'productId'})
    }
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};