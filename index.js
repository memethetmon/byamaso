const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes/api');
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// connect to the database
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

// since mongoose promise is depreciated, override it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const passport = require('passport');
// initialize passport session and start the session
app.use(passport.initialize());
app.use(passport.session());    //calls serializeUser and deserializeUser (persistent login sessions)

// setup passport local mongoose
const User = require('./models/user');
passport.use(User.createStrategy()); //createStrategy is responsible to setup passport-local LocalStrategy with the correct options
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser); //use static serialize and deserialize of model for passport session support

// to serve images using express, make the project directory static
app.use('/uploads', express.static('uploads'));
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
