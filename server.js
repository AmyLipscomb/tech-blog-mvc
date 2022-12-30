require('dotenv').config();
const path = require ('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session')



const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 6001;

// const { Dog, Owner } = require('./models'); <- UPDATE FOR MODELS IN THIS
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'v5SCD!=RQSTz_!&FgK-Qfi$^9jhot3%XGJiVE!$%3*94I-nPwdzcoAFC$TKs#j@s&__4DxZgZ8TNhTxiT0YCTudhlbQt*wTFH=SA9rU721(ll6C1yiuLHSr7RqINCI@H',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(routes);


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