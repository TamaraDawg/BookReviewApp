const seedBooks = require('./bookSeed');
const seedGenres = require('./genreSeed');
const seedReviews = require('./reviewSeed');
const seedUsers = require('./userSeed');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- BOOKS SYNCED -----\n');

    await seedBooks();
    console.log('\n----- BOOKS SEEDED -----\n');

    await seedGenres();
    console.log('\n----- GENRES SEEDED -----\n');

    await seedReviews();
    console.log('\n----- REVIEWS SEEDED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
  process.exit(0);
};

seedAll();
