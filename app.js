require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); //TODO - use cors

const PORT = 3001;

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@test-cluster.zd4zpe4.mongodb.net/${process.env.DB_NAME}`;
mongoose.connect(dbURI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

// routes
//('*') = all the routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});
//TODO - create login in form, upon login, issue a token valid for 24 hours for subsequent authenticated requests.

app.get('/signup', (req, res) => {
    res.render('signup');
});
//TODO - create registration form, Allow users to register with a username and password. Passwords should be hashed before storing in the database.

app.get('/dogs', (req, res) => {
    res.render('dogs');
});