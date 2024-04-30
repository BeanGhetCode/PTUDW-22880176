let controller = {};
const { Op, where } = require('sequelize');
const models = require('../models');

controller.show = async (req, res) => {
    let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
    let tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);
    let keyword = req.query.keyword || '';
    let sort =['Popularity', 'Newest', 'Price'].includes(req.query.sort) ?req.query.sort: 'Price';
    let page = isNaN (req.query.page) ? 1 : Math.max(1,parseInt(req.query.page));

    let categories = await models.Category.findAll({
        include: [{
            model: models.Product
        }]
    });
    res.locals.categories = categories;

    let tags = await models.Tag.findAll({
        include: [{
            model: models.Product
        }]
    });
    res.locals.tags = tags;

    let options = {
        attributes: ['id', 'name', 'imagePath', 'stars', 'price'],
        include: [{
            model: models.Category
        }],
        where: {}
    };
    if (tag > 0) {
        options.include.push({
            model: models.Tag,
            where: { id: tag }
        });
    }

    if (category > 0) {
        options.include.push({
            model: models.Category,
            where: { id: category }
        });
    }
    if (keyword.trim() !== '') {
        options.where.name = {
            [Op.iLike]: `%${keyword}%`
        };
    }
    switch (sort) {
        case 'Popularity':
            options.order = [['stars', 'DESC']];
            break;
        case 'Newest':
            options.order = [['createdAt', 'DESC']];
            break;
        default:
            options.order = [['price', 'ASC']];
            break;
    }

    let originalUrl = removeParam('sort', req.originalUrl);
    res.locals.originalUrl = originalUrl;

    if (Object.keys(req.query).length ==0){
        res.locals.originalUrl = res.locals.originalUrl + '?'
    };
    //let products = await models.Product.findAll(options);
    let featuredProducts = await models.Product.findAll({
        attributes: ['id', 'name', 'imagePath', 'stars', 'price'],
        order: [['stars', 'DESC']],
        limit: 3
    });
    res.locals.featuredProducts = featuredProducts;

    const limit = 6;
    options.limit = limit;
    options.offset = limit * (page -1);
    let {rows, count} = await models.Product.findAndCountAll(options);

    res.locals.pagination = {
        page: page, 
        limit:limit,
        totalRows: count, 
        queryParams: req.query
    }
    
    
    res.locals.products = rows;
    res.render('shop');
}

controller.showDetail = async (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    let product = await models.Product.findOne({
        attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'summary', 'description', 'specification'],
        where: { id },
        include: [{
            model: models.Category,
            attributes: ['name']
        }, {
            model: models.Review,
            attributes: ['review', 'id', 'stars', 'createdAt'],
            include: [{
                model: models.User,
                attributes: ['firstName', 'lastName']
            }]
        },{
            model: models.Tag,
            attributes: ['id']
        }]
    });
    let tagIds = [];
    product.Tags.forEach(tag => tagIds.push(tag.id));

    let relatedProducts = await models.Product.findAll({
        attributes: ['id', 'name', 'imagePath', 'price', 'summary'],
        include: [
            {
                model: models.Tag,
                where: {
                    id: {[Op.in]: tagIds}
                }
            },
            {
                model: models.Category
            }
        ]
    });
    res.locals.relatedProducts = relatedProducts;
    res.locals.product = product;
    res.render('shop-detail');


}

function removeParam(key, sourceURL) {
    let rtn = sourceURL.split("?")[0];
    let param;
    let params_arr = [];
    let queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (let i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

module.exports = controller;
