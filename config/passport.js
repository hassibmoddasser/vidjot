const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocal = require('passport-local');

const LocalStrategy = passportLocal.Strategy;

// Load User Model
require('../models/User')
const User = mongoose.model('users');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

      // Match User
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'No User Found'});
          }

          // Match Password
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if (err) {
              throw err;
            }

            if (isMatched) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password Incorrect'});
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};