const router = require('express').Router();
const { Book } = require('../models');
const { Genre } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {

    const data = await Book.findAll({ // display by genre if i have time
        limit: 5, 
        attributes: { include: ['title'] }, 
        // include: [
        //     {
        //         model: Book,
        //         attributes: ['name']
        //     }
        // ]
    });
    const books = data.map((bookData) => bookData.get({ plain: true }));

    res.render('layouts/main', {
        books,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('error: ', err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', { loginPage: true});
});

module.exports = router;
