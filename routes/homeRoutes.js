const express = require('express');
const withAuth = require('../utils/auth'); //cant get this to work rn
const homeController = require('../controllers/homeControllers');

const router = express.Router();

router.route('/login').get(homeController.showLoginPage);
router.route('/signup').get(homeController.showSignupPage);

// GET all books for homepage
router.route('/').get(withAuth, homeController.getAllBooks);

// GET one book
router.route('/api/books/:id').get(withAuth, homeController.getOneBook);

// Create review
router.route('/api/reviews').post(homeController.postReview);

router.route('/search').get(homeController.searchBooks);

module.exports = router;
