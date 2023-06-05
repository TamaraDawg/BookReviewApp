const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
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
    });
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
