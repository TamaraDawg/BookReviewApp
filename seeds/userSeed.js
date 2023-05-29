const { User } = require('../models');

const userData = [
    {
        // seed again after added in the model
        // avatar: 'https://i.imgur.com/2u3u3uX.jpg',
        username: 'testuser1',
        email: 'test@test.com',
        password: 'password12345',
    },
];

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;