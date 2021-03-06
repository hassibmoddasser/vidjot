const mongoose =  require('mongoose');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');


// Display Ideas
exports.ideaList = (req, res) => {
  Idea.find({ userId: req.user.id }).sort({ sort: 'desc' }).lean()
    .then(ideas => {
      res.render('ideas/index', {
        page: req.originalUrl,
        ideas
      });
  });
};

// Display Idea CREATE form on GET
exports.ideaCreateGet = (req, res) => {
  let scripts = [
    { src: '/js/form-validation.js' }
  ];

  res.render('ideas/add', {
    page: req.originalUrl,
    scripts 
  });
};

// Handle Idea CREATE form on POST
exports.ideaCreatePost = (req, res) => {
  let { title, details } = req.body;
  let userId = req.user;

  let errors = [];

  if (!title) {
    errors.push({ msg: 'Please add a title' });
  }

  if (!details) {
    errors.push({ msg: 'Please add details' });
  }

  // If there are errors
  if (errors.length > 0) {
    res.render('ideas/add', {
      page: req.originalUrl,
      errors,
      title,
      details
    });
  } else {
    new Idea({
      title,
      details,
      userId
    })
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video Idea added');
        res.redirect('/ideas');
      });
  }
};

// Display Idea EDIT form on GET
exports.ideaEditGet = (req, res) => {
  let scripts = [
    { src: '/js/form-validation.js' }
  ];

  Idea.findOne({ _id: req.params.id }).lean()
    .then(idea => {
      if (idea.userId != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/ideas');
      } else {
        res.render('ideas/edit', {
          page: req.originalUrl,
          idea,
          scripts
        });
      }
    });
};

// Handle Idea UPDATE form on POST
exports.ideaUpdatePost = (req, res) => {
  Idea.findOne({ _id: req.params.id })
    .then(idea => {
      idea.title = req.body.title;
      idea.details = req.body.details;

      idea.save()
        .then(idea => {
          req.flash('success_msg', 'Video Idea updated');
          res.redirect('/ideas');
        });
    });
};

// Handle Idea DELETE
exports.ideaDelete = (req, res) => {
  Idea.deleteOne({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Video Idea removed');
      res.redirect('/ideas');
    });
};