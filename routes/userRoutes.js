const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

const User = require('../models/User');

// Create new user
// Route to Sign up page
router.route('/signup').post(userController.signUpUser);

// Login
router.route('/login').post(userController.loginUser);

// Logout
router.route('/logout').post(userController.logoutUser);

module.exports = router;
