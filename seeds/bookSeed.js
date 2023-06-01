const axios = require('axios'); // makes fetch easier (i think)
const Book = require('../models/Book.js');


const seedBooks = async () => {
    try {
      const batchSize = 40; //batch per fetch, doesnt allow more than 40 fetch
      const totalBooks = 100; // total number, does 120 for somereason
      const iterations = Math.ceil(totalBooks / batchSize); // rounds up to the nearest whole number
      let booksData = []; // empty array
  
      for (let i = 0; i < iterations; i++) { // fetch request
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: 'top 100 books', // search query
            startIndex: i * batchSize, // sets the start index to the batch size
            maxResults: batchSize, // sets the max results to the batch size
          },
        });
  
        const books = response.data.items; 
  
        const batchData = books.map((book) => {
          const book_cover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''; // sets the book cover to the thumbnail
          const title = book.volumeInfo.title;
          const synopsis = book.volumeInfo.description ? book.volumeInfo.description : 'No description available.'; // sets the synopsis to the description, unknown if no description is found
          const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'; // sets author as unknown, if no author is found
          const release_date = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Unknown'; // sets release date as unknown, if no release date is found
          return { book_cover, title, synopsis, author, release_date }; 
        });
  
        booksData = booksData.concat(batchData); // adds the batch data to the books data
      }
  
      // Create new book records in the database
      await Book.bulkCreate(booksData); // creates the books data
  
      console.log('Seed completed successfully.');
    } catch (error) {
      console.error('Seed failed:', error);
    }
};
  
module.exports = seedBooks;
  