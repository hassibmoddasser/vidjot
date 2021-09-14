const mongoose =  require('mongoose');

// Load Idea Model
// require('../models/User');
// const User = mongoose.model('users');


// Login Page
exports.login = (req, res) => {
  res.render('users/login', { layout: 'user' });
};

// Register Page
exports.register = (req, res) => {
  res.render('users/register', { layout: 'user' });
};