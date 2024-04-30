'use strict';
const express = require ('express');
const app = express();
const port = process.env.PORT || 5000;
const { Sequelize } = require('sequelize');
const expressHandlebars = require('express-handlebars');
//const models = require('./models');
const {createStarList} = require('./controller/handlebarsHelper');
const {createPagination} = require('express-handlebars-paginate');
const session = require ('express-session')
// Cấu hình public static 
app.use(express.static(__dirname + '/public'));

// Cấu hình express handlebars
app.engine('hbs', expressHandlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        createStarList,
        createPagination
    }
}));
app.set('view engine', 'hbs');


app.use (express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'Bean',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        maxAge: 20*60*1000 //20p
    }
}))
app.use((req, res, next) => {
    let Cart = require('./controller/cart');
    req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
    res.locals.quantity = req.session.cart.quantity;
    next();
});

app.use('/', require('./router/indexRouter'));
app.use('/shop', require('./router/productsRouter'));


app.use((req, res, next)=>{
    res.status(404).render('errorPage', {Message: 'Page Not Found'})
})

app.use ((error, req, res, next) =>{
    console.error(error);
    res.status(500).render('errorPage', {Message: 'Internal Server Error'})
})

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});
