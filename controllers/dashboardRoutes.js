const checkAuth = require('./auth/authentification');
const { Blog, User } = require('../models')
const router = require('express').Router();

// GET all posts

router.get('/', checkAuth, async (req, res) => {
try {
    const blogData = await Blog.findAll({
        include: [User], //bringing in the 'User' model
        where: { id: req.session.id}
    }) 
    const blogs = blogData.map(blog => blog.get({plain:true}));
    res.render("dashboard", blogs);
} catch (err) {
    res.redirect("login")
}
});

module.exports = router;
