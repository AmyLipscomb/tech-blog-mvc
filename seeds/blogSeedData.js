const {Blog} = require('../models');

const blogData = [
    {
        blog_post_title:"MVC",
        blog_post_content: "If you use the MVC method, you first want to create three folders: 'M' for Models, 'V' for Views and 'C' for Controller",
        blog_post_date: "01/02/2023",
        user_id: 1
    },
    {
        blog_post_title:"New Year's Resolutions",
        blog_post_content: "My New Year's Resolution is to read more. In order to do that, I will read for 20 minutes a day.",
        blog_post_date: "01/01/2023",
        user_id: 2
    },
    {
        blog_post_title:"Hi!",
        blog_post_content: "I wanted to create a post!",
        blog_post_date: "01/05/2023",
        user_id: 3
    },
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;