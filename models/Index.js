//import models
const Blog = require('./Blog');
const User = require('./User');

// A user can have many (hasMany) blog posts
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// A blog post can only have (belogsTo) one user 
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Add module.exports
module.exports = {
    Blog,
    User,
};



