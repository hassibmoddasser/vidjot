const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


// Login Page
router.get('/login', UserController.login);

// Register Page
router.get('/register', UserController.register);


module.exports = router;