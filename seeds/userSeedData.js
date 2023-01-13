const { User } = require('../models');

const userData = [
    {
        name: "Amy",
        email: "amy.a.lipscomb@gmail.com",
        username:  "amylip24",
        password: "#techblogfun24!",
    },
    {
        name: "Jake",
        email: "jakesemail@gmail.com",
        username: "Jake",
        password: "2428abc",
    },
    {
        name: "Bobbie",
        email: "bobbiesemail@gmail.com",
        username: "Bobbie",
        password: "2428abc",
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;