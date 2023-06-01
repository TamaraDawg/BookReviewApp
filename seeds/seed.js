const seedGenres = require('./genreSeed');
const seedBooks = require('./bookSeed');
const seedUsers = require('./userSeed');
const seedReviews = require('./reviewSeed');
const seedAll = require('./newbook');



const sequelize = require('../config/connection');

// const seed = async () => { //needs to be seeded in this order, pls dont rearrange
//   await sequelize.sync({ force: true });
//   console.log('\n----- BOOKS SYNCED -----\n');
  
//   await seedGenres();
//   console.log('\n----- GENRES SEEDED -----\n');

//   await seedBooks();
//   console.log('\n----- BOOKS SEEDED -----\n');

//   await seedUsers();
//   console.log('\n----- USERS SEEDED -----\n');

//   await seedReviews();
//   console.log('\n----- REVIEWS SEEDED -----\n');

//   process.exit(0);
// };
const seed = async () => {
  await sequelize.sync({ force: true });
  await seedAll();
  console.log('\n----- BOOKS SEEDED -----\n');
}


// Run the seed function
seed(); 
