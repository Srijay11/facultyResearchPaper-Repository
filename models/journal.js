const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title:String,
    issn:Number,
    subject:String,
    author:String,
    year: String,
    publication:String,
});

module.exports = mongoose.model('Journal', journalSchema);