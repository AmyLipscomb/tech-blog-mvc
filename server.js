// Dependencies
require('dotenv').config();
const path = require ('path'); 
const express = require('express'); 
const routes = require('./controllers'); 
const sequelize = require('./config/connection'); 

const exphbs = require('express-handlebars'); 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({}); 

//Sets up the Express App
const app = express();
const PORT = process.env.PORT || 6001;

const { Blog, User } = require('./models'); 





const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//Set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT}`));
});

//User Login

//Logout User if not active after 10 min

app.use('*', (req, res, next) => {
  if (req.session.user) {
    const lastSeen = req.session.lastSeen;
    let diff = (Date.now() - lastSeen) / 1000;

    // If inactive for 10 min, reset their session
    if (diff > 20 * 60) {
      req.session.user = undefined;
      req.session.lastSeen = undefined;
      res.redirect('/login');
    }
    else {
      req.session.lastSeen = Date.now();
      next();
    }
  }
  else {
    next();
  }
});