const mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport')

// Load Idea Model
require('../models/User');
const User = mongoose.model('users');


// Render Login Page
exports.login = (req, res) => {
  res.render('users/login', {
    title: 'Login',
    layout: './layouts/user'
  });
};

// Render Register Page
exports.register = (req, res) => {
  res.render('users/register', {
    title: 'Register',
    layout: './layouts/user'
  });
}

// Handle User LOGIN form on POST
exports.userLoginPost = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

// Handle User CREATE form on POST
exports.userCreatePost = (req, res) => {
  let { name, email, password, confirm } = req.body;
  
  let errors = [];
  
  if (!name) {
    errors.push({ msg: 'Please add your name' });
  }

  if (!email) {
    errors.push({ msg: 'Please add your email address' });
  }

  if (!password) {
    errors.push({ msg: 'Please add a password '});
  }

  if (password != confirm) {
    errors.push({ msg: 'Confirm password does not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must at least 8 characters' });
  }

  // If errors do exist
  if (errors.length) {
    res.render('users/register', {
      title: 'Register',
      layout: './layouts/user',
      errors,
      name,
      email,
      password,
      confirm
    });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'Email already registered');
          res.redirect('/register');
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                throw err;
              }
      
              let hashedPassword = hash;
              new User({
                name,
                email,
                password: hashedPassword
              })
                .save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/login');
                })
                .catch(err => {
                  console.log(err);
                });
            })
          });
        }
      })
  }
};

// Handle User LOGOUT on GET
exports.logout = (req, res) => {
  req.logout();

  req.flash('success_msg', 'You are logged out!');
  res.redirect('/login');
};