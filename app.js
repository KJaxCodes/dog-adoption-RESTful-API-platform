require('dotenv').config();

//database
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dogRoutes = require('./routes/dogRoutes');
const cookieParser = require('cookie-parser'); // import the cookie parser
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');
const { connectToDB } = require('./db')
const cors = require('cors'); // import cors

const PORT = process.env.PORT || 3001; 

// create express app
const app = express(); 

// connect to database
connectToDB();  

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for form submissions
app.use(express.json()); //takes any json data that comes along with a request and parses it into a javascript object for us to use inside the code
app.use(cookieParser()); //use the cookie parser

// view engine
app.set('view engine', 'ejs');

// Routes
app.use(cors()); // Use CORS middleware to enable CORS for all routes   
app.use(checkUser); // to check user on all routes
app.use('/', authRoutes);  // to handle auth routes
app.use('/', dogRoutes);   // to handle dog routes 

// Root route
app.get('/', (req, res) => {
    res.status(200).render('home');
});

module.exports = app;