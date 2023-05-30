const router = require('express').Router();
const { Book } = require('../models');
const { Genre } = require('../models');
const withAuth = require('../utils/auth');

// Route to home page which contains all the books
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const data = await Genre.findAll({
//         attributes: { exclude: ['id'] },
//         include: [
//             {
//                 model: Book,
//                 attributes: ['name']
//             }
//         ]
//     });

//     const books = data.map((bookData) => bookData.get({ plain: true }));

//     res.render('homepage', {
//         books,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//     console.log('error: ', err);
//   }
// });

// Login route
router.get('/login', (req, res) => {
  console.log('Get login page')
  // if the user is logged in already, redirect to home page // TODO: Add session later
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }
  // to render the login page
  res.render('login');
});

module.exports = router;
