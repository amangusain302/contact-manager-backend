const mongoose = require('mongoose');
const mongodbUrl = 'mongodb://localhost:27017/Contact-Manager';
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDb connection error: "))

module.exports = db