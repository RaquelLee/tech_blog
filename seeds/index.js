const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedComment = require('./comments');
const seedPost = require('./posts');
const seedUser = require('./users');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED ----\n');

    await seedUser();
    console.log('\n-----USER SEEDED----\n');

    await seedPost();
    console.log('\n-----POST SEEDED----\n');

    await seedComment();
    console.log('\n-----COMMENT SEEDED----\n');

    process.exit(0);
};

seedAll();