const express = require('express');
const router = express.Router();

const { Book, User, Review } = require('../models');
const withAuth = require('../utils/auth'); //cant get this to work rn

const { Op } = require('sequelize');

// GET all books for homepage
router.get('/', async (req, res) => {
  try {
    const data = await Book.findAll({
      limit: 10,
    });

    const books = data.map((book) => book.get({ plain: true }));

    console.log(books);

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
    const dbBookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    if (!dbBookData) {
      res.status(404).json({ message: 'No book found with this id' });
      return;
    }

    const book = dbBookData.get({ plain: true });
    console.log(book);
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
      attributes: ['id', 'title', 'synopsis', 'book_cover'],
      limit: 1,
      include: [
        {
          model: Review,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    const books = data.map((book) => {
      const bookData = book.get({ plain: true });
      bookData.reviews = bookData.reviews.map((review) => {
        return {
          ...review,
          username: review.user.username, // Add the 'username' property to the review object
        };
      });
      console.log(bookData);
      return bookData;
    });

    res.status(200).render('singlebook', {
      books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/review', async (req, res) => {
  try {
    const { book_id, review_text, review_rating } = req.body;

    if (!book_id) {
      throw new Error('Invalid book ID');
    }

    const newReview = await Review.create({
      user_id: 1, // Change to req.session.user_id when login is working
      review_text,
      book_id,
      review_rating,
    });

    res.status(200).redirect('back');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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
