const axios = require('axios');
const Book = require('../models/Book.js');


const seedBooks = async () => {
    try {
      const batchSize = 40;
      const totalBooks = 100;
      const iterations = Math.ceil(totalBooks / batchSize);
      let booksData = [];
  
      for (let i = 0; i < iterations; i++) {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: 'top 100 books',
            startIndex: i * batchSize,
            maxResults: batchSize,
          },
        });
  
        const books = response.data.items;
  
        const batchData = books.map((book) => {
          const book_cover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
          const title = book.volumeInfo.title;
          const synopsis = book.volumeInfo.description ? book.volumeInfo.description : 'No description available.';
          const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
          const release_date = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Unknown';
          return { book_cover, title, synopsis, author, release_date };
        });
  
        booksData = booksData.concat(batchData);
      }
  
      // Create new book records in the database
      await Book.bulkCreate(booksData);
  
      console.log('Seed completed successfully.');
    } catch (error) {
      console.error('Seed failed:', error);
    }
};
  
module.exports = seedBooks;
  