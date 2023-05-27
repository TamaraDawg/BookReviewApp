const { Book } = require('../models');

const bookData = [
    {
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg',
        title: 'Harry Potter',
        synopsis: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.',
        author: 'J.K. Rowling',
        genre_id: 1,
        release_date: 'June 26, 1997',
    },
];

const seedBooks = () => Book.bulkCreate(bookData);
module.exports = seedBooks;