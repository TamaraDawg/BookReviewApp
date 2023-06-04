const router = require('express').Router();
const { Book, Genre } = require('../models');

// GET all books for homepage
router.get('/', async (req, res) => {
  try {
    const dbBookData = await Book.findAll({
      limit: 10, 
      include: [
        {
          title: 'title',
          // model: Genre,
          // attributes: ['genre_name'],
        },
      ],
    });

    // const books = dbBookData.map((book) => book.get({ plain: true }));
    // console.log(books)
    res.status(200).json(books);
    // TODO: render later
    // res.render('homepage', {
    //   books,
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one book
router.get('/book/:id', async (req, res) => {
  try {
    const dbBookData = await Book.findByPk(req.params.id
    //   , {
    //   // include: [
    //   //   {
    //   //     model: Genre,
    //   //     attributes: [genre_name],
    //   //   },
    //   // ],
    // }
    );

    const book = dbBookData.get({ plain: true });
    // TODO: render later
    // res.render('homepage', { book, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;