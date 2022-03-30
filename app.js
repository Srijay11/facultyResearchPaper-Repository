const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Journal = require('./models/journal');
const Theses = require('./models/theses');
const Conference = require('./models/conference');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/LUXEDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch(err => {
        console.log("Mongo Connection Error")
        console.log(err)
    })

app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));
app.get('/', async (req, res) =>{
    isLoggedIn = false
    user = null;
    if(req.session.user_id)
    {
        isLoggedIn = true
        _id = req.session.user_id
        const user = await User.findOne({_id: req.session.user_id});
        name = user.fname
        console.log(user)
        return res.render('home', {user})
    }
    res.render('home', {user})
})

app.get('/login',(req, res) => {
    res.render('auth/login')
})

app.post('/login',async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword)
    {
        req.session.user_id = user._id
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/')
})

app.get('/signup',(req, res) => {
    isEmailUnique = true
    res.render('auth/signup',{ isEmailUnique })
})

app.post('/signup', async (req, res) => {
    const {fname, lname, email, password} = req.body;
    isEmailUnique = true
    if(await User.findOne({email}))
    {
        isEmailUnique = false
        res.render('auth/signup',{ isEmailUnique })
    }
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        fname,
        lname,
        email,
        password: hash
    })
    await user.save();
    res.redirect('/login')
})

app.get('/search',async(req,res)=>{
    res.render('products/search')
})

app.post('/search',async(req,res)=>{
    const results = req.body.search;
    const s = await Journal.find({"title":results});
    res.render('products/searchres',{s});
})

app.post('/type', async(req,res)=>{
    const type = req.body.category;
    if(type==="theses")
    {
        res.render("products/new");
    }
    else if(type==="journal")
    {
        res.render("products/newj");
    }
    else
    {
        res.render("products/newc");
    }

})

app.get('/products', async (req, res) =>{
    const products = await Journal.find({})
    const products2 = await Conference.find({})
    res.render('products/allproducts', { products, products2 })
})

app.get('/wallets', async(req, res) =>{
    const products = await Journal.find({})
    res.render('products/wallets', { products })
})

app.get('/watches', async(req, res) =>{
    const products = await Theses.find({})
    res.render('products/watches', { products })
})

app.get('/bags', async(req, res) =>{
    const products = await Conference.find({})
    res.render('products/bags', { products })
})

app.get('/products/new',(req, res) => {
    res.render('products/type')
})

app.post('/products', async (req, res) => {
    
    console.log(req.body);
    const newProduct = new Theses(req.body);
    await newProduct.save();
    res.redirect('/products');
})

app.post('/products1', async (req, res) => {
    
    console.log(req.body);
    const newProduct = new Conference(req.body);
    await newProduct.save();
    res.redirect('/products');
})

app.post('/products2', async (req, res) => {
    
    console.log(req.body);
    const newProduct = new Journal(req.body);
    await newProduct.save();
    res.redirect('/products');
})


app.get('/profile',(req, res) => {
    if(!req.session.user_id)
    {
        return res.redirect('/login')
    }
    else
    res.render("profile");
})

app.listen(3000, () =>{
    console.log("Listening on port 3000")
})