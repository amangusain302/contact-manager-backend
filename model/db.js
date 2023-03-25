const mongoose = require('mongoose');
require("dotenv").config()
const mongodbUrl = process.env.DB;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDb connection error: "))

module.exports = db