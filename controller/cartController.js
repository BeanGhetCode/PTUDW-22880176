'use strict'
let controller = {};

controller.add = async (req,res) =>{
    let id = isNaN (req.body.id) ? 0 : parseInt(req.body.id);
    let quantity = isNaN (res.body.quantity) ? 0 : parseInt(req.body.quantity);

    let product = await models.Product.findBypk(id);
    if(product){
        req.session .cart.add(product, quantity);
    }
    return res.json ({quantity: res.session.cart.quantity})
}
module.exports = controller;