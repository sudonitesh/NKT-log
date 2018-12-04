const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Cart = require('../models/cart');

router.get('/', function(req, res, next) {
    let successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        let productChunks = [];
        let chunkSize = 3;
        for(let i =0; i < docs.length; i+=chunkSize){
            productChunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/index',
            {
                title: 'Cart',
                products: productChunks,
                successMsg:successMsg,
                noMessages:!successMsg
            });
    });
});

router.get('/add-to-cart/:id',function(req,res,next){
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId,function (err, product) {
        if(err){
            return res.redirect('/');
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/')
    });
});

router.get('/shopping-cart',function (req, res, next) {
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{products:null})
    }
    let cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',
        {
            products:cart.generateArray(),
            totalPrice:cart.totalPrice
        })
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}

