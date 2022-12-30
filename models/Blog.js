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

















