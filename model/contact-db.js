const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
})
const contactModel = new mongoose.model('contacts', contactSchema);

module.exports = contactModel;