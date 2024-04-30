'use strict';

let express = require('express');
let router = express.Router(); 
let controller = require('../controller/productController');
const { route } = require('./indexRouter');
let cartController = require('../controller/cartController');

router.get('/', controller.show);

router.get('/:id', controller.showDetail);

router.post('/cart', cartController.add);

module.exports = router;
