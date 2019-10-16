const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/tikibar';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
  .then(() => console.log('MongoDB successfuly connected...'))
  .catch((err) => console.log(err));

module.exports = {
    User: require('./User'),
}