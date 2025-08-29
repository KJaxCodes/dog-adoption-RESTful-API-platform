const Dog = require('../models/dog');
const User = require('../models/user');
const mongoose = require("mongoose");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: "", age: "", description: "", size: "" };

    // validation errors
    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};



module.exports.registerDog_get = (req, res) => {
    res.render('registerDog')
};
module.exports.registerDog_post = async (req, res) => {
    const { name, age, description, size } = req.body;

    try {
        const newDog = await Dog.create({ name, age, description, size, registeredBy: req.user._id });
        res.status(201).json({ dog: newDog._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};
module.exports.dogs_get = async (req, res) => {
    try {
        //page query - /dogs?page=x
        const page = req.query.page ? Number(req.query.page) : 1;
        const filter = req.query.filter || "all"; // default to "all"
        console.log("Page: " + page, "Filter: " + filter, "Current user: " + req.user.id);

        //pagination settings
        const itemsPerPage = 2;
        const skip = (page - 1) * itemsPerPage;
        const limit = 2;

        //filter query
        const currentUser = req.user._id;
        let query = {};

        //"available" means the dog is not adopted - if registered by current user it will have REMOVE
        //"adopted" means the dog has been adopted by current or other user
        //"my dogs" means the dog was registered by current user
        if (filter === "available") {
            query.adoptedBy = { $exists: false };
        } else if (filter === "registered" && currentUser) {
            query.registeredBy = currentUser;
        } else if (filter === "adopted" && currentUser) {
            query.adoptedBy = currentUser;
        }


        const dogs = await Dog.find(query).skip(skip).limit(limit); // fetch 2 dogs at a time
        res.render('dogs', { dogs, page, itemsPerPage, userId: req.user ? req.user._id.toString() : null, filter }); // pass dogs to EJS view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching dogs');
    }
};

module.exports.getDogById = (req, res) => {
    const { id } = req.params;
    res.send(`Details of dog with ID: ${id}`);
};

module.exports.deleteDogById = async (req, res) => {
    const { id } = req.params;
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) {
            return res.status(404).send({error: 'Dog not found'});
        }
        if (dog.registeredBy.toString() !== req.user._id.toString()) {
            return res.status(403).send({error: 'Unauthorized to delete this dog'});
        }
        await Dog.findByIdAndDelete(req.params.id);
        res.redirect('/dogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports.adoptDog_post = async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);

        if (!dog) {
            return res.status(404).send({error: "Dog not found"});
        }

        if (dog.registeredBy.toString() === req.user._id.toString()) {
            return res.status(403).send({error: "You cannot adopt your own dog"});
        }

        if (dog.adoptedBy) {
            return res.status(400).send({error:"Dog already adopted"});
        }

        dog.adoptedBy = req.user._id;
        await dog.save();

        res.redirect('/dogs'); // redirect to updated dogs list
    } catch (err) {
        console.error(err);
        res.status(500).send({error: "Server error"});
    }
};
