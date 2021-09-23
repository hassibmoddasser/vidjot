const mongoose =  require('mongoose');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');


// Display Ideas
exports.ideaList = (req, res) => {
  Idea.find({ user: req.user.id }).sort({ sort: 'desc' }).lean()
    .then(ideas => {
      res.render('ideas/index', {
        ideas
      });
  });
};

// Display Idea CREATE form on GET
exports.ideaCreateGet = (req, res) => {
  let scripts = [
    { src: '/js/form-validation.js' }
  ];

  res.render('ideas/add', { scripts });
};

// Handle Idea CREATE form on POST
exports.ideaCreatePost = (req, res) => {
  let { title, details } = req.body;
  let user = req.user.id;

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
      errors,
      title,
      details
    });
  } else {
    new Idea({
      title,
      details,
      user
    })
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video Idea added');
        res.redirect('/idea');
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
      if (idea.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/idea');
      } else {
        res.render('ideas/edit', { idea, scripts });
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
          res.redirect('/idea');
        });
    });
};

// Handle Idea DELETE
exports.ideaDelete = (req, res) => {
  Idea.deleteOne({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Video Idea removed');
      res.redirect('/idea');
    });
};