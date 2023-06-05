const router = require('express').Router();
const { Book, Genre } = require('../models');
const withAuth = require('../utils/auth'); //cant get this to work rn

const { Op } = require('sequelize');

// GET all books for homepage
router.get('/', async (req, res) => {
  try {
    const data = await Book.findAll({
      limit: 10, 
      attributes: ['id', 'title', 'synopsis'],
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

    if (!dbBookData) {
      res.status(404).json({ message: 'No book found with this id' });
      return;
    }

    const book = dbBookData.get({ plain: true });
    
    res.status(200).render('bookdetails', { 
      book,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/search', async (req, res) => {
  const { search } = req.query;

  try {
    const data = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`, // Search for titles containing the search keyword
        },
      },
      attributes: ['id', 'title', 'synopsis' , 'book_cover'],
      limit: 10,
    });

    const books = data.map((book) => book.get({ plain: true }));

    res.status(200).render('singlebook', {
      books,
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