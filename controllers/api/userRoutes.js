const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Blog, User } = require('../../models');
const checkAuth = require('../auth/authentification');


//GET user accounts
// router.get('/', checkAuth, async (req, res) => 
// {
//     try {
//         const userData = await User.findAll({
//             where: {
//                 id: req.session.user
//             }
//         });
//         res.status(200).json({
//             name: userData.name,
//             id: userData.id,
//             email: userData.email,
//             username: userData.username,
//         })
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// });

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

        req.session.save(() => {
          //updated this on 1/13/2023 am 
          req.session.user = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;
          console.log(JSON.stringify("test"))
          res.status(200).send(JSON.stringify({message: "test"}));
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
          console.log(JSON.stringify(user,null,2))
          console.log(JSON.stringify(userData,null,2))
          //Added lines 82-99
          const validPassword = user.checkPassword(req.body.password);

          if(!validPassword){
            console.log("can't validate password")
            res.status(400).json({message: 'No user account found!'});
            return;
          }
          req.session.save(() => {
            req.session.user = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

          res.json(user);
          });
        } catch(err) {
          res.status(500).json(err)
        }
      })
        //   if (userData) {
        //     //NEED TO CHANGE LINE 82 - since i'm using 'checkPassword' in my user model, I need that instead of the compare! 
        //     if (await bcrypt.compare(user.password, userData.password)) {
              
                  // req.session.save(() => {
                  // req.session.user = userData.id;
                  // req.session.username = userData.username;
                  // req.session.loggedIn = true;
        //           console.log(JSON.stringify("test"))
        //           res.status(200).send(JSON.stringify({message: "test"}));
        //         });   
        //     }
        //     else {
        //       res.status(400).json({
        //         'err': 'Invalid password!',
        //       });
        //     }
        //   }
        //   else {
        //     res.status(400).json({
        //       'err': 'Unable to find user with that username!',
        //     });
        //   }
        // } catch (err) {
        //   res.status(400).json(err);
        // }
      // });

// LOGOUT 
router.post('/logout', (req, res) => {
  if(req.session.loggedIn){
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// DELETE user account
// router.delete('/', checkAuth, async (req, res) =>
// {
//     try {
//         const userData = await User.destroy({
//             where:{
//                 id: req.session.user,
//             }
//         })
//         if(!userData){
//             res.status(404).json({ messsage: "No account with this login information"});
//             return;
//         }
//         res.status(200).json({
//             "success" :true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
    

module.exports = router;