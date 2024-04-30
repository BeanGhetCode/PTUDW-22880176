'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        
        static associate(models) {
            // define association here
            Wishlist.belongsTo(models.User, { foreignKey: 'userId' });
            Wishlist.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    }
    Wishlist.init({

    }, {
        sequelize,
        modelName: 'Wishlist',
    });
    return Wishlist;
};