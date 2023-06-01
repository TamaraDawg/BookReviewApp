
console.log("Hello from apitest.js"); // TODO: Delete later before submission

document.getElementById('book-search').addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookName = document.getElementById('bookName').value;

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const books = data.items;
    console.log(books);


    books.forEach((book) => {
      console.log('Title:', book.volumeInfo.title);
      console.log('Author:', book.volumeInfo.authors);
      console.log('Description:', book.volumeInfo.description);
      console.log('---');
    });
  } catch (error) {
    console.log('Error:', error.message);
  }
});
