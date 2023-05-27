const { Review } = require('../models');

const reviewData = [
    {
        review_text: 'This is a review',
        review_rating: 3,
        user_id: 1,
        post_id: 1,
    }
]

const seedReviews = () => Review.bulkCreate(reviewData);
module.exports = seedReviews;