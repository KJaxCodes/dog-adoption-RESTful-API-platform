require('dotenv').config();
// console.log('Mongo URI:', process.env.MONGO_URI);
//database
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dogRoutes = require('./routes/dogRoutes');
const cookieParser = require('cookie-parser'); // import the cookie parser
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');
const cors = require('cors'); //TODO - use cors

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for form submissions
app.use(express.json()); //takes any json data that comes along with a request and parses it into a javascript object for us to use inside the code
app.use(cookieParser()); //use the cookie parser

// view engine
app.set('view engine', 'ejs');

// Connect to MongoDB before starting the server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Routes
        app.use(checkUser);
        app.use('/', authRoutes);
        app.use('/', dogRoutes);

        // Root route
        app.get('/', (req, res) => {
            res.render('home');
        });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

startServer();
