const checkAuth = require('./auth/authentification');
const { Blog, User } = require('../models')

const router = require ('express').Router();

// router.get('/', function(req, res){
//     if (!req.session || !req.session.user) {
//         res.render('login', {
//             user: req.session.user
//         });
//     } 
// });

router.get('/', async function(req, res){
    try {
        const blogData = await Blog.findAll({
        include: [User]
        });
    
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogs)
        res.render('blog', {
          blogs,
        });
      } catch (err) {
      }    
});

router.get('/signup', function(req, res){
    res.render('signup', {
        user: req.session.user
    });

});

router.get('/login', function(req, res){
    res.render('login', {
        user: req.session.user
    });

});

router.get('/addapost', function(req, res){
    res.render('addapost', {
        user: req.session.user
    });
});

router.get('/logout', function(req, res){
    req.session.user = undefined;
    req.session.lastSeen  = undefined;
    res.redirect('/');
});



router.get('/logout', function(req, res){
    req.session.user = undefined;
    req.session.lastSeen  = undefined;
    res.redirect('/');
});




module.exports = router;
