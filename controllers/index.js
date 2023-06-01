const router = require('express').Router();
const { Book, Genre } = require('../models/index.js'); 

const sequelize = require('../config/connection.js');

const apiRoutes = require('./api/index.js');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  try {

    const genresWithBooks = await Genre.findAll({
      attributes: { exclude: ['id'] },
      include: [
        {
          model: Book,
          attributes : ['title', 'author'],
        },
      ],
      raw: true,
      nest: true,
    });

    // const genresWithBooks = data.map((genreData) => {
    //   const genre = genreData;
    //   const books = genre.Books ? genre.Books.map((book) => book.title) : [];
    //   return { ...genre, books };
    // });
  

    res.render('layouts/main', { genresWithBooks });
    console.log(genresWithBooks);

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

  res.render('login');
});

module.exports = router;

