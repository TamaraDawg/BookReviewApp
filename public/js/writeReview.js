showReviewForm = (event) => {
  event.preventDefault();

  console.log('Write review button has been clicked.');

  var reviewBox = document.getElementById('review-box');
  reviewBox.style.visibility = 'visible';
};

submitReview = async (event) => {
  event.preventDefault();

  const reviewText = querySelector('#review-text').value.trim();

  if (reviewText) {
    const response = await fetch('/api/reviews/', {
      method: 'POST',
      body: JSON.stringify({ reviewText }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Thank you for submitting a review.');
    } else {
      alert('There was an error in sumbitting your review. Please try again!');
    }
  } else {
    alert('Your review is empty. Please type somthing!');
  }
};

document
  .querySelector('#write-review')
  .addEventListener('click', showReviewForm);

document.querySelector('#submit-btn').addEventListener('click', submitReview);
