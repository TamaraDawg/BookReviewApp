const router = require('express').Router();
const { Book, Genre } = require('../models');
const withAuth = require('../utils/auth');

// GET all books for homepage
router.get('/', withAuth, async (req, res) => {

  try {
    const data = await Book.findAll({
      limit: 10, 
      attributes: ['title'],
    });

    const books = data.map((book) => book.get({ plain: true }));

    res.status(200).render('booklist', {
      books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one book
router.get('/book/:id', async (req, res) => {
  try {
    const dbBookData = await Book.findByPk(req.params.id);

    const book = dbBookData.get({ plain: true });
    
    res.status(200).render('bookdetails', { 
      book,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
try {
    res.status(200).render('login');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); //redirect to login page /api/users/login

router.get('/signup', (req, res) => {
try {
    res.status(200).render('signup');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); //redirect to signup page /api/users/signup



module.exports = router;