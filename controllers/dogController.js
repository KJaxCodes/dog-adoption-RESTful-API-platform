


module.exports.registerDog_get = (req, res) => {
    res.render('registerDog')
};
module.exports.registerDog_post = (req, res) => {
    res.render('new registerDog')
};
module.exports.dogs_get = (req, res) => {
    res.render('dogs')
};

module.exports.getDogById = (req, res) => {
    const { id } = req.params;
    res.send(`Details of dog with ID: ${id}`);
};

module.exports.deleteDogById = (req, res) => {
    const { id } = req.params;
    res.send(`Dog with ID ${id} deleted`);
};