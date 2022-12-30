const router = require('express').Router();
//THIS LINE IS TO CONNECT THE MODELS - NEED TO MAKE THEM!
const checkAuth = require("../auth/authentification");
const { Op } = require('sequelize');
require('dotenv').config();


//CREATE new user account