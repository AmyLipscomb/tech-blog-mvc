const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const SALT = 15;

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
{
    //id:
    id: {
        type: DataTypes.INTEGER, // * Integer.
        allowNull: false,  // * Doesn't allow null values.
        primaryKey: true, // * Set as primary key.
        autoIncrement: true,  // * Uses auto increment.
    },
    //name:
    name: {
        type: DataTypes.STRING, // * String
        allowNull: false,
    },
    //email: 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    //username
    username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    //password:
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {   
        hooks: {
          beforeCreate: async (newOwnerData) => {
            newOwnerData.password = await bcrypt.hash(newOwnerData.password, 10);
            return newOwnerData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
}

);

module.exports = User;