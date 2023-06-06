showReviewForm = (event) => {
  event.preventDefault();

  console.log('Write review button has been clicked.');

  var reviewBox = document.getElementById('review-box');
  reviewBox.style.visibility = 'visible';
};

document
  .querySelector('#write-review')
  .addEventListener('click', showReviewForm);
