const { Genre } = require('../models');

const genreData = [
    {
        genre_name: 'Fantasy',
    },
    {
        genre_name: 'Horror',
    }
]

const seedGenres = () => Genre.bulkCreate(genreData);
module.exports = seedGenres;