const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    frequency: Number,
    topics: {
        happyHour: Boolean,
        cocktail: Boolean,
        tikitender: Boolean,
        event: Boolean,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;