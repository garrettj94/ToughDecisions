const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tough-decisions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;