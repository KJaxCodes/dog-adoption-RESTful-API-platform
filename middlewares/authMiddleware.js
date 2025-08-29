// Replace this file with custom middleware functions, including authentication and rate limiting

const jwt = require('jsonwebtoken');
const User = require('../models/user');

//check authentication status
const requireAuth = (req, res, next) => {

    console.log("cookies object in request", req.cookies);

    const token = req.cookies.jwt;

    // check json web token exists and is valid
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.redirect(401, '/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        return res.redirect(401, '/login');
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                req.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        req.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };