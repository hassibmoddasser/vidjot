const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


// Login Page
router.get('/login', UserController.login);

// Register Page
router.get('/register', UserController.register);

// Login form
router.post('/login', UserController.userLoginPost);

// Register Form
router.post('/register', UserController.userCreatePost);


module.exports = router;