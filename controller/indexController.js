'use strict';
const controller = {};
const models = require('../models'); 
const sequelize = require('sequelize')

controller.showHomepage = async(req,res) =>{
    let categories = await models.Category.findAll()
    let bestseller= await models.Product.findAll({
        attributes: ['id', 'name', 'imagePath', 'quantity','stars', 'price'],
        order: [['quantity', 'ASC']],
        limit: 10
    });
    res.locals.bestseller = bestseller
    res.locals.categories = categories;

    res.render ('index');
}
controller.showPage = async (req, res, next) => {
    const pages = ['cart', 'checkout', 'contact', 'login', 'shop-detail', 'wishlish', 'my-account'];
    let tags = await models.Tag.findAll()
    res.locals.tags = tags;
    if (pages.includes(req.params.page)) {
        let categories = await models.Category.findAll();
        res.locals.categories = categories;

        let featuredProducts = await models.Product.findAll({
            attributes: ['id', 'name', 'imagePath', 'stars', 'price'],
            order: [['stars', 'DESC']],
            limit: 3
        });
        res.locals.featuredProducts = featuredProducts;

        return res.render(req.params.page);
    }
    
    next();
};


module.exports = controller;