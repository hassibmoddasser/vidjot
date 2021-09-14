const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');

// Init express
const app = express();

// Connect to DB
mongoose.connect('mongodb://localhost/vidjot')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Load routes
const index = require('./routes/index');
const ideas = require('./routes/ideas');
const users = require('./routes/users');


// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Used to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Method Override Middleware
app.use(methodOverride('_method'));

// Express Session Middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

// Connect Flash Middleware
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  
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
app.use('/idea', ideas);
app.use('/user', users);


const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});