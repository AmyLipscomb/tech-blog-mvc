const {Blog} = require('../models');

const blogData = [
    {
        blog_post_title:"How to Create a Route",
        blog_post_content: "If you use the MVC method, you first want to create three folders: 'M' for Models, 'V' for Views and 'C' for Controller",
        // blog_post_creator: "Amy L.",
        blog_post_date: "01/02/2023",
        user_id: 1
    },
    {
        blog_post_title:"New Year's Resolutions",
        blog_post_content: "",
        // blog_post_creator: "Amy L.",
        blog_post_date: "01/01/2023",
        user_id: 2
    },
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;