const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
});

// fire a function after a doc (new user in this case) is saved to db
userSchema.post('save', function (doc, next) { //note post here is a hook, it's not the POST method
    console.log('new user created and saved', doc);
    next(); //next must be called otherwise everything stalls and it doesn't know to continue on
});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    //if the user exists, compare the password entered with the hashed password in the db
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);
//the first argument MUST be the singular version of the database collection, which for this is called users
//the second argument is the schema this model is based on, which we defined above and called userSchema

module.exports = User;