// Replace this file with the logic for handling incoming requests and returning responses to the client

module.exports.signup_get = (req, res) => {
    res.render('signup')
};
module.exports.signup_post = (req, res) => {
    res.render('new signup')
};
module.exports.login_get = (req, res) => {
    res.render('login')
};
module.exports.login_post = (req, res) => {
    res.render('new login')
};
module.exports.logout_get = (req, res) => {
    res.render('logout')
};
module.exports.registerDog_get = (req, res) => {
    res.render('registerDog')
};
module.exports.registerDog_post = (req, res) => {
    res.render('new registerDog')
};