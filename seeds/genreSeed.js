const { Genre } = require('../models');

const genreData = [
    {
        genre_name: 'Fantasy',
    }
]

const seedGenres = () => Genre.bulkCreate(genreData);
module.exports = seedGenres;