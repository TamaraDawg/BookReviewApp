
console.log("Hello from apitest.js"); // TODO: Delete later before submission

$('#fetchBook').on('click', async (e) => {
  e.preventDefault();

  try {
    const response = await axios.get('/api/key');
    const apiKey = response.data.apiKey;

    const bookTitle = $('#book-title').val();
    const bookResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: bookTitle,
        key: apiKey
      },
    });

    const books = bookResponse.data.items;
    console.log(books);
    
  } catch (err) {
    console.log(err);
  }
});

