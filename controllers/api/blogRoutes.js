const router = require('express').Router();
const { Blog, User } = require('../../models');
const checkAuth = require("../auth/authentification");
// const { Op } = require('sequelize');
// require('dotenv').config();


//CREATE new blog post
router.post('/', checkAuth, async (req, res) => {
    try {
        const blogData = await Blog.create({
            user_id: req.session.user,
            blog_post_title: req.body.blog_post_title,
            blog_post_content: req.body.blog_post_content,
            blog_post_creator: req.body.blog_post_creator,
            blog_post_date: req.body.blog_post_date
        });
        res.status(200).json(blogData);
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
});

//UPDATE blog post
router.put('/:id', checkAuth, async (req, res) => {
    try {
         const blogData = await Blog.update(req.body, {

            where: {
                owner_id: req.session.user,
                id: req.params.id,
            }
        });
        if (!blogData[0]) {
            res.status(404).json({ message: "No blog found!" });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE blog post
router.delete('./:', checkAuth, async (req,res) => {
try {
    const blogData = await Blog.destroy({
        where: {
            owner_id: req.session.user,
            id: req.params.id,
        }
    })
    if (!blogData){
        res.status(404).json({
            message: "No blog with this ID"
        });
        return;
    }
    res.status(200).json(blogData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;