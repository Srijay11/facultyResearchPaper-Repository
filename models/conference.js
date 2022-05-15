const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
})

const Conference = mongoose.model('Conference', conferenceSchema);

module.exports = Conference;