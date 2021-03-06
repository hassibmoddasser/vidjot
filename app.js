const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

// Init express
const app = express();

// DB Config
const db = require('./config/keys');
mongoose.connect(db.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Load routes
const index = require('./routes/index');
const ideas = require('./routes/ideas');
const users = require('./routes/users');


// Passport Configuration
require('./config/passport')(passport);


// EJS Middleware
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Used to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Method Override Middleware
app.use(methodOverride('_method'));

// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  
  res.locals.user = req.user || null;
  
  next();
});

// Public directory middleware
app.use(express.static('public'));

// Asset Middleware
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/font', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));


// Use Routes
app.use('/', index);
app.use('/ideas', ideas);
app.use('/', users);


const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port}`));