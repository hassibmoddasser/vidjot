module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/login');
    }
    return next();
  }
};