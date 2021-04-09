const { User } = require('../models');

const userData = [
    {
        "email": "raquel@email.com",
        "name": "Raquel",
        "password": "password"
    },
    {
        "email": "xandromus@email.com",
        "name": "Xandromus",
        "password": "password"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;