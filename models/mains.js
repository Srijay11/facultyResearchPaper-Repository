const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    type: String,
    country:String,
    author:String,
    image: String,
    tags:String,
    subject: String,
    issn: String,
});

const researchSchema = new Schema({
    type: String,
    issn: String,
    subject: String,
    image: String,
    publisher:String,
    country:String,
    author:String,
    tags:String,
});



module.exports = mongoose.model('Journal', journalSchema);