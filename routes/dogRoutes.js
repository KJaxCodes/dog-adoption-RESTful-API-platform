// Replace this file with the routes of your API
const express = require('express');
const { Router } = require('express');
const dogController = require('../controllers/dogController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = Router();

// dog routes plan
// /dogs GET - view all dogs
// /dogs:id GET - view a specific dog
// /register_dog GET - register dog page
// /register_dog POST - register a new dog in db
// /dogs/:id DELETE - remove a dog from db, 

router.get('/registerDog', dogController.registerDog_get);
router.post('/registerDog', requireAuth, dogController.registerDog_post);
router.get('/dogs', dogController.dogs_get);
router.post('/adopt/:id', requireAuth, dogController.adoptDog_post);
router.get('/dogs/:id', dogController.getDogById);
router.post('/dogs/delete/:id', requireAuth, dogController.deleteDogById);



module.exports = router;
