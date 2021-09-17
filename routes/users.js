const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


// Login Page
router.get('/login', UserController.login);

// Register Page
router.get('/register', UserController.register);

// Register Form
router.post('/register', UserController.userCreatePost);


module.exports = router;