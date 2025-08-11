const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true // trims whitespace
    },
    age: {
        type: Number,
        required: [true, 'Please enter a valid age in years'],
        min: [1, 'Only dogs 1 year and up allowed for adoption']
    },
    description: {
        type: String,
        required: [true, 'Please include relevant details for matchmaking'],
        trim: true, //trims whitespace
        maxlength: [300, 'Description cannot exceed 300 characters']
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: [true, 'Current size required']
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adoptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
}, { timestamps: true });

const Dog = mongoose.model('dog', dogSchema);
//the first argument MUST be the singular version of the database collection, which for this is called dogs
//the second argument is the schema this model is based on, which we defined above and called dogSchema

module.exports = Dog;