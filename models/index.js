const Book = require('./Book');
const Genre = require('./Genre');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Book.belongsTo(Genre, {
    foreignKey: 'genre_id',
});

Genre.hasMany(Book, {
    foreignKey: 'genre_id',
});

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

module.exports = { Book, Genre, User, Post, Comment };
