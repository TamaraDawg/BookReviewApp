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

module.exports = router;

// const { Op } = require('sequelize');

// router.get('/search', async (req, res) => {
//   const { search } = req.query;

//   try {
//     const data = await Book.findAll({
//       where: {
//         title: {
//           [Op.like]: `%${search}%`, // Search for titles containing the search keyword
//         },
//       },
//       attributes: ['id', 'title', 'synopsis', 'book_cover'],
//       limit: 1,
//       include: [
//         {
//           model: Review,
//           include: [
//             {
//               model: User,
//             },
//           ],
//         },
//       ],
//     });

//     const books = data.map((book) => {
//       const bookData = book.get({ plain: true });
//       bookData.reviews = bookData.reviews.map((review) => {
//         return {
//           ...review,
//           username: review.user.username, // Add the 'username' property to the review object
//         };
//       });
//       console.log(bookData);
//       return bookData;
//     });

//     res.status(200).render('singlebook', {
//       books,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.post('/review', async (req, res) => {
//   try {
//     const { book_id, review_text, review_rating } = req.body;

//     if (!book_id) {
//       throw new Error('Invalid book ID');
//     }

//     const newReview = await Review.create({
//       user_id: 1, // Change to req.session.user_id when login is working
//       review_text,
//       book_id,
//       review_rating,
//     });

//     res.status(200).redirect('back');
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });
