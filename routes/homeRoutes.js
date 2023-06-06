const express = require('express');
const withAuth = require('../utils/auth'); //cant get this to work rn
const homeController = require('../controllers/homeControllers');

const router = express.Router();

// GET all books for homepage
router.route('/').get(withAuth, homeController.getAllBooks);

// GET one book
router.route('/book/:id').get(withAuth, homeController.getOneBook);

// Login route
router.route('/login').get(homeController.showLoginPage);

// Signup route
router.route('/signup').get(homeController.showSignupPage);

router.route('/search').get(homeController.searchBooks);

router.route('/review').post(homeController.postReview);

module.exports = router;
