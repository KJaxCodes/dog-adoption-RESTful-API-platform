const Dog = require('../models/dog');

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
        const dogs = await Dog.find(); // fetch all dogs
        res.render('dogs', { dogs, userId: req.user ? req.user._id.toString() : null }); // pass dogs to EJS view
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
            return res.status(404).send('Dog not found');
        }
        if (dog.registeredBy.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized to delete this dog');
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
            return res.status(404).send("Dog not found");
        }

        if (dog.registeredBy.toString() === req.user._id.toString()) {
            return res.status(403).send("You cannot adopt your own dog");
        }

        if (dog.adoptedBy) {
            return res.status(400).send("Dog already adopted");
        }

        dog.adoptedBy = req.user._id;
        await dog.save();

        res.redirect('/dogs'); // redirect to updated dogs list
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
