const axios = require('axios');
const NewBook = require('../models/NewBook.js');

const seedAll = async () => {
  try {
    // Fetch the top 100 books from the API
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: 'top 2 books',
        maxResults: 2,
      },
    });

    const books = response.data.items;

    // Save each book to the database
    for (const book of books) {
      const title = book.volumeInfo.title;
      const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';

      // Create a new book record in the database
      await NewBook.bulkCreate({ title, author });

      console.log(`Book '${title}' by ${author} saved to the database.`);
    }

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
  }
};

seedAll();
module.exports = seedAll;
