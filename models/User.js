const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    frequency: Number,
    happyHour: Boolean,
    cocktail: Boolean,
    tikitender: Boolean,
    event: Boolean,
    daily: Boolean,
    weekly: Boolean,
    monthly: Boolean,
    dateCreated: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;