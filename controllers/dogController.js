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
        const newDog = await Dog.create({ name, age, description, size });
        res.status(201).json({ dog: newDog._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};
module.exports.dogs_get = async (req, res) => {
    try {
        const dogs = await Dog.find(); // fetch all dogs
        res.render('dogs', { dogs }); // pass dogs to EJS view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error while fetching dogs');
    }
};

module.exports.getDogById = (req, res) => {
    const { id } = req.params;
    res.send(`Details of dog with ID: ${id}`);
};

module.exports.deleteDogById = (req, res) => {
    const { id } = req.params;
    res.send(`Dog with ID ${id} deleted`);
};

