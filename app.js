const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fac = require('./models/mains')
const app = express();
const emate = require('ejs-mate')
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/facultyPub')
    .then(() => {
        console.log('db connected')
    })
    .catch(err => {
        console.log('db not connected')
    })

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.engine('ejs', emate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/aboutus', (req, res) => {
    res.render('aboutus')
})

app.get('/explore', (req, res) => {
    res.render('explore')
})


app.listen(3000, () => {
    console.log("listening on port 3000")
})