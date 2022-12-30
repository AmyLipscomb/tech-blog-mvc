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

    router.post('/login', async (req, res) => {
        try {
          const user = req.body;
          if (!user.username) {
            res.status(400).json({
              'err': "Missing username"
            });
            return;
          }
      
          if (!user.password) {
            res.status(400).json({
              'err': "Missing password"
            });
            return;
          }
          
          const userData = await User.findOne({
            where: {
              username: user.username,
            }
          });
      
          if (userData) {
            if (await bcrypt.compare(user.password, userData.password)) {
    
                req.session.user = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
        
              res.status(200).json({
                username: userData.username,
                email: userData.email,
                id: userData.id
              });
              
            }
            else {
              res.status(400).json({
                'err': 'Invalid password!',
              });
            }
          }
          else {
            res.status(400).json({
              'err': 'Unable to find user with that username!',
            });
          }
        } catch (err) {
          res.status(400).json(err);
        }
      });

// DELETE user account
router.delete('/', checkAuth, async (req, res) =>
{
    try {
        const userData = await User.destroy({
            where:{
                id: req.session.user,
            }
        })
        if(!userData){
            res.status(404).json({ messsage: "No account with this login information"});
            return;
        }
        res.status(200).json({
            "success" :true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
    

module.exports = router;