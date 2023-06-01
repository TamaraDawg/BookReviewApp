const axios = require('axios');
const NewBook = require('../models/NewBook.js');
console.log("Hello from newbook.js");

const seedAll = async () => {
    try {
      // Fetch the top 2 books from the API
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: 'top 2 books',
          maxResults: 2,
        },
      });
  
      const books = response.data.items;
  
      const booksData = books.map((book) => {
        const title = book.volumeInfo.title;
        const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
  
        return { title, author };
      });
  
      // Create new book records in the database
      await NewBook.bulkCreate(booksData);
  
      console.log('Seed completed successfully.');
    } catch (error) {
      console.error('Seed failed:', error);
    }
};
  
seedAll();
  
module.exports = seedAll;
