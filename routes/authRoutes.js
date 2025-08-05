// Replace this file with the routes of your API

const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('signup', authController.signup_get);
router.post('signup', authController.signup_post);
router.get('login', authController.login_get);
router.post('login', authController.login_post);
router.get('logout', authController.logout_get);
router.get('registerDog', authController.registerDog_get);
router.post('registerDog', authController.registerDog_post);

module.exports = router;

// /signup GET - sign up page
// /signup POST - create a new user in db
// /login GET - log in page
// /login POST - authenticate a current user
// /logout GET - log a user out
// /registerDog GET - register dog page
// /registerDog POST - create a new dog in db to display on dogs page

// get/post requests for removing and adoption dogs?