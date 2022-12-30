const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Blog, User } = require('../../models');
const checkAuth = require('../auth/authentification');


//GET user accounts
router.get('/', checkAuth, async (req, res) => 
{
    try {
        const userData = await User.findAll({
            where: {
                id: req.session.user
            }
        });
        res.status(200).json({
            name: userData.name,
            id: userData.id,
            email: userData.email,
            username: userData.username,
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//CREATE new user account
router.post('/', async (req, res) => {
    try {
        const newUser = req.body;

        if (newUser.password?.length < 8){
            res.status(400).json({err: "Password must be at least 8 characters."});
            return;
        }
        //create the newuser with the hashed password and save to DB 
        const userData = await User.create (newUser);

            req.session.user = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

        res.status(200).json({
            name: userData.name,
            id: userData.id,
            email: userData.email,
            username: userData.username,
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//LOGIN user 
    //POST api/users/login





module.exports = router;