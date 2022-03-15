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
  Order.find((err, orders, username)=>{
    if(err){
      return res.write("Errore nel caricamento del profilo.");
    }
    var cart;
    // loop through orders
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
  if(req.user)
    if(req.user.isAdmin)
      res.render('dashboardAdmin');
    else
      res.render('dashboard',{ orders: orders, username: req.user.username });
  else
    res.redirect('/');
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

// route to register
router.get('/register', (req, res, next)=> {
  const messages = req.flash('error');
  res.render('register',{csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0});

});
router.post('/register', passport.authenticate('local.register',{
  failureRedirect: '/user/register',
  failureFlash: true
}),
//Route to dashboard if correctly registered
(req, res, next)=>{
  if (req.session.oldUrl){
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else {
      res.redirect('/user/dashboard');
  }
});


//route to login
router.get('/login', (req, res, next)=>{
  const messages = req.flash('error');
  res.render('login',{csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0})
});

router.post('/login', passport.authenticate('local.login',{
  failureRedirect: '/login',
  failureFlash: true
}),//Go to index if user correctly logged in
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
