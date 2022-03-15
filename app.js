const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport =require('passport');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const validationResult  = require('express-validator');//@5.3.1
const session = require('express-session');
const MongoStore = require('connect-mongo');
const env = require('dotenv').config();
const app = express();

//Database connection
mongoose.connect(process.env.URI,{ useNewUrlParser: true }, err => err?console.log(err):console.log('Successfully connected to MongoDB'));
require('./config/passport');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validationResult());
app.use(cookieParser());
//Session settings
app.use(session({
	secret: "key per i cookie",
	saveUninitialized: false,
	resave: false,
	store: MongoStore.create({ 
		mongoUrl: process.env.URI,
		autoRemove: 'disabled'
	}),
	cookie: { maxAge:30000,secure:false }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//verify if authenticated
app.use((req, res, next)=>{
  res.locals.login =req.isAuthenticated();
  //access sessions through templates
  res.locals.session = req.session;
  next();
});

//Main Routes
app.use('/',  require('./routes/index'));
app.use('/user', require('./routes/user'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  //locals for error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //Error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

