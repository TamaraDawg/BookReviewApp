const { Book, Review, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllBooks = async (req, res) => {
  try {
    const data = await Book.findAll({
      // limit: 12,
    });

    const books = data.map((book) => book.get({ plain: true }));

    res.status(200).render('booklist', {
      books,
      loggedIn: req.session.loggedIn,
    });
    // res.status(200).json({
    //   books,
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getOneBook = async (req, res) => {
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
      loggedIn: req.session.loggedIn,
    });
    // res.status(200).json({ book, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.showLoginPage = (req, res) => {
  try {
    res.status(200).render('login');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.showSignupPage = (req, res) => {
  try {
    res.status(200).render('signup');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.searchBooks = async (req, res) => {
  const { search } = req.query;
  //route takes search string, and looks for books with the same name
  try {
    const data = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`, // Search for titles containing the search keyword
        },
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No books found with this title' });
      return;
    }

    const books = data.map((book) => book.get({ plain: true })); //get plain object from sequelize object

    // res.status(200).render('booklist', {
    //   books,
    // });
    res.status(200).json({
      status: 'success',
      books,
      loggedIn: req.session.loggedIn, //didnt think you need this, but breaks css if removed
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.postReview = async (req, res) => {
  try {
    const { book_id, review_text } = req.body;

    if (!book_id) {
      throw new Error('Invalid book ID');
    }

    const newReview = await Review.create({
      user_id: req.session.user.id,
      review_text,
      book_id,
    });

    res.status(200).json({
      status: 'success',
      review: newReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
