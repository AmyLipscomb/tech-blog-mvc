const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
    {
        //id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },

        //blog_post_title
        blog_post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        //blog_post_content
        blog_post_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        //blog_post_creator
        blog_post_creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        //blog_post_date
        blog_post_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },

        //user_id
        user_id: {
            type: DataTypes.INTEGER,
            // * References the `User` model's `id`.
            references: {
            model: "user",
            key: "id",
            },
      },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "blog",
      }
);

module.exports = Blog;


//https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/















