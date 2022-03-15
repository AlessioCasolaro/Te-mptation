const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Extra = require('../models/extra');
const hbs = require('hbs');

const paginate = require('express-handlebars-paginate');
hbs.registerHelper('paginate', paginate.createPagination);

// GET home page.
router.get('/', function (req, res, next) {
  console.log("Utente in sessione: " + req.user)
  const successMsg = req.flash('success')[0];
  res.render('index', { successMsg: successMsg, noMessage: !successMsg });
});

// GET home page.
router.get('/bot', function (req, res, next) {
  res.render('bot');
});

//GET Products
router.get('/stuff', (req, res, next) => {
  Product.find((err, result) => {
    var dataChunks = [];
    var chunkSize = 6;

    //Result for paginate
    const pageSize = 10; //Results for page
    const pageCount = Math.ceil(result.length / pageSize);
    let currentPage = 1; //Current page
    let resultList = [];

    //For products list
    for (var i = 0; i < result.length; i += chunkSize) {
      dataChunks.push(result.slice(i, i + chunkSize));
    }
    //set current page if specifed
    if (typeof req.query.page !== 'undefined') {
      currentPage = +req.query.page;
    }
    //show list of products
    resultList = dataChunks[+currentPage - 1];
    res.render('stuff', {
      datas: resultList,
      pagination: {
        page: 1,       //Default page
        limit: 10      //Number of available pages
      }
    });
  });
});


router.get('/add_to_cart/:id', function (req, res, next) {
  var productId = req.params.id;
  //create a new cart and check in session if old cart exits
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  //Find product, add it to session
  Product.findById(productId, function (err, product) {
    //Throw error if not found
    if (err) {
      return res.redirect('/stuff');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/stuff');
  });
});

//View cart route
router.get('/cart', (req, res, next) => {
  //Return empty cart if not exists
  if (!req.session.cart) {
    return res.render('cart', { products: null });
  }
  const cart = new Cart(req.session.cart);
  res.render('cart', { products: cart.generateArray(), totalPrice: cart.totalPrice.toFixed(2) });
});

//Querying all Extra for CheckoutSelect
const arrExtra = [];
Extra.find((err, result) => {
  result.forEach(function (result) {
    arrExtra.push(result.extraName.toString());
  });
});

//Checkout route
router.get('/checkout', isLoggedin, (req, res, next) => {
  //check if a shopping cart exists
  if (!req.session.cart) {
    return res.redirect('/cart');
  }

  const cart = new Cart(req.session.cart);
  const errMsg = req.flash('error')[0];
  console.log(arrExtra)
  return res.render('checkout', { total: cart.totalPrice, extras: arrExtra, errMsg: errMsg, noErrors: !errMsg });
});

router.post('/checkout', isLoggedin, (req, res, next) => {
  //check if a shopping cart exists
  if (!req.session.cart) {
    return res.redirect('/cart');
  }

  //Get today date
  var today = new Date();
  var currentData = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  const cart = new Cart(req.session.cart);
  console.log(req.body.extra)
  //Creating order
  const order = new Order({
    user: req.user,
    cart: cart,
    date: currentData,
    tableNumber: req.body.tableNumber,
    name: req.body.name,
    extra: req.body.extra
  });
  console.log(order)

  //save order in database
  order.save((err, result) => {
    //process after succesful transaction
    req.flash('success', 'Acquisto effettuato con successo!');
    req.session.cart = null;
    res.redirect('/');
  });

});

//Indexing articles
router.get('/article1', (req, res) => {
  res.render('articles/article1');
});

router.get('/article2', (req, res) => {
  res.render('articles/article2');
});



module.exports = router;

//Check if users are authenticated before accessing checkout page
function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  //save old Url
  req.session.oldUrl = req.url;
  res.redirect('/user/login');
}

//Make sure users AREN'T logged in.
function notLoggedin(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

