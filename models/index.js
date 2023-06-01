const Book = require('./Book');
const Genre = require('./Genre');
const User = require('./User');
const Review = require('./Review');


Genre.hasMany(Book, {
    foreignKey: 'genre_id',
});

Book.belongsTo(Genre, {
    foreignKey: 'genre_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { Book, Genre, User, Review };
