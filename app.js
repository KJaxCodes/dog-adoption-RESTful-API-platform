require('dotenv').config();
//database
const { connectLocalDb } = require('./db');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const dogRoutes = require('./routes/dogRoutes');
const cors = require('cors'); //TODO - use cors

const PORT = 3001;

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');



// routes
//('*') = all the routes
app.get('/', (req, res) => {
    res.render('home');
});

// app.get('/login', (req, res) => {
//     res.render('login');
// });
// //TODO - create login in form, upon login, issue a token valid for 24 hours for subsequent authenticated requests.

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });
// //TODO - create registration form, Allow users to register with a username and password. Passwords should be hashed before storing in the database.

// app.get('/dogs', (req, res) => {
//     res.render('dogs');
// });
// // TODO - connect mongobd to dynamically pull registered dog data, only accessible if logged in

// app.get('/registerDog', (req, res) => {
//     res.render('registerDog');
// });
// // TODO - connect to mongodb to add registered dogs to db, only accessible if logged in

app.use(authRoutes);
app.use(dogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});