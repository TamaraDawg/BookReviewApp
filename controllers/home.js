const router = require('express').Router();
const { Book } = require('../models');
const { Genre } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const data = await Genre.findAll({
        attributes: { exclude: ['id'] },
        include: [
            {
                model: Book,
                attributes: ['name']
            }
        ]
    });

    const books = data.map((bookData) => bookData.get({ plain: true }));

    res.render('homepage', {
        books,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
