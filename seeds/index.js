const seedBlog = require('./blogSeedData');
const seedUser = require('./userSeedData');

const sequelize = require('../config/connection');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUser();
    console.log('\n----- USER SEEDED -----\n');
    await seedBlog();
    console.log('\n----- BLOG SEEDED -----\n');

    process.exit(0);
};

seedAll();