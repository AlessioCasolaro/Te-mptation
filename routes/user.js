//User routes
const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Order = require('../models/order');
const Cart = require('../models/cart');
const exec  = require('child_process').exec;
//use csrf protection
const csrfProtection = csrf({ cookie: true });
router.use(csrfProtection);


router.get('/dashboard', (req, res, next)=>{
  Order.find((err, orders)=>{
    if(err){
      return res.write("Errore nel caricamento del profilo.");
    }
    var cart;
    // loop through orders
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
  
  
  res.render('dashboard');
  });
});

//route to profile page
router.get('/profile', isLoggedin, (req, res, next)=>{
  //query database
  Order.find({user: req.user}, (err, orders , username)=>{
    if(err){
      return res.write("Errore nel caricamento del profilo.");
    }
    var cart;
    // loop through orders
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('profile',{ orders: orders, username: req.user.username });
  });
});

//logout router
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/');
})


//check if users aren't logged in.
router.use('/', notLoggedin,(req, res, next)=>{
  next();
})

// route to register page
router.get('/register', (req, res, next)=> {
  const messages = req.flash('error');
  res.render('register',{csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0});

});
//direct to profile if registration is successful
router.post('/register', passport.authenticate('local.register',{
  failureRedirect: '/user/register',
  failureFlash: true
}),
//after succesful registration move on to either profile or checkout pg
(req, res, next)=>{
  if (req.session.oldUrl){
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else {
      res.redirect('/user/profile');
  }
});


//route to profile page
router.get('/login', (req, res, next)=>{
  const messages = req.flash('error');
  res.render('login',{csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0})
});

//direct to profile if login successful
router.post('/login', passport.authenticate('local.login',{
  failureRedirect: '/login',
  failureFlash: true
}),
//after succesful login move on to profile page
  (req, res, next)=>{
  if (req.session.oldUrl){
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else {
      res.redirect('/')
  }
});


module.exports = router;

//USER CHECK FUNCTIONS
//make sure users ARE authenticated before accessing profile page
function isLoggedin(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

//make sure users AREN'T logged in.
function notLoggedin(req, res, next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
