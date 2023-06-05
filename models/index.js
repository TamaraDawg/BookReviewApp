const Book = require('./Book');
const Genre = require('./Genre');
const User = require('./User');
const Review = require('./Review');

Book.belongsTo(Genre, {
    foreignKey: 'genre_id',
});

Genre.hasMany(Book, {
    foreignKey: 'genre_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

Review.belongsTo(Book, {
foreignKey: 'book_id',
});

Book.hasMany(Review, {
    foreignKey: 'book_id',
});



module.exports = { Book, Genre, User, Review };
