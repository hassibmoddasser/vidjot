const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { page: req.originalUrl });
});

router.get('/about', (req, res) => {
  res.render('about', { page: req.originalUrl });
});

module.exports = router;