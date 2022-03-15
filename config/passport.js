const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;


//Temp session for passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//Register new user, check is user exists and create new user
passport.use('local.register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  req.checkBody('username', 'Invalid Username').notEmpty();//Make sure user is not empty
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({ min: 6 });//Make sure password is not empty and lenght>=6
  const errors = req.validationErrors();
  if (errors) {
    const messages = [];
    errors.forEach((error) => {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({ 'username': username }, (err, user) => {
    if (err) {
      return done(err);
    }
    //Check if user already exists
    if (user) {
      return done(null, false, { message: 'Username already in use' });
    }
    console.log("User " + username + "\nnome " + req.body.nome + "\nsurname " + req.surname + "\nAge " + req.age + "\nemail " + req.email + "\npassword " + password);
    //User creation
    const newUser = new User();
    newUser.username = username;
    newUser.name = req.body.nome;
    newUser.surname = req.body.surname;
    newUser.age = req.body.age;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(password);
    newUser.isAdmin = false;//IsAdmin Boolean for Dashboard
    newUser.save((err, result) => {
      //Return error in saving
      if (err) {
        return done(err);
      }
      //Return new user correctly saved 
      return done(null, newUser);
    });
  });
}));

//Login existing users
passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  req.checkBody('username', 'Invalid Username').notEmpty();//Make sure user is not empty
  req.checkBody('password', 'Invalid Password').notEmpty();//Make sure password is not empty
  const errors = req.validationErrors();
  if (errors) {
    const messages = [];
    errors.forEach((error) => {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  //Check if it exists
  User.findOne({ 'username': username }, (err, user) => {
    if (err) {
      return done(err);
    }
    //Error for user not existing
    if (!user) {
      return done(null, false, { message: 'No user found' });
    }
    //check if password match
    if (!user.validPassword(password)) {//validPassword passport.js funct
      return done(null, false, { message: 'Wrong password' });
    }
    return done(null, user);
  });
}));
