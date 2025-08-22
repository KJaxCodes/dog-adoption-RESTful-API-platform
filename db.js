const mongoose = require('mongoose');

// database connection
const DEV_DB_URI = process.env.MONGO_URI_DEV;
const TEST_DB_URI = process.env.MONGO_URI_TEST;

const connectLocalDb = () => {
    mongoose.connect(dbURI)
        .then(() => console.log('Connected to local MongoDB'))
        .catch((err) => console.error('Could not connect to local MongoDB:', err));
}

const connectToDB = async () => {
    try {
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === "test") {
            await mongoose.connect(TEST_DB_URI);
            console.log('Connected to MongoDB TEST DB');
        } else {
            await mongoose.connect(DEV_DB_URI);
            console.log('Connected to MongoDB DEV DB');
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = { connectLocalDb, connectToDB };