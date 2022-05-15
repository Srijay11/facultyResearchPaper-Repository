const mongoose = require('mongoose');

const thesesSchema = new mongoose.Schema({
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
    university: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true
    }
})

const Theses = mongoose.model('Theses', thesesSchema);

module.exports = Theses;