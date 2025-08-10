const mongoose = require('mongoose');

// database connection

const connectLocalDb = () => {
    mongoose.connect(dbURI)
        .then(() => console.log('Connected to local MongoDB'))
        .catch((err) => console.error('Could not connect to local MongoDB:', err));
}



module.exports = { connectLocalDb };