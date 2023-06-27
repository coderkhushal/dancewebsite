const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const fs= require("fs")
const mongoose = require("mongoose")
const { stringify } = require("querystring");
const bodyparser = require("body-parser");


mongoose.connect('mongodb://127.0.0.1:27017/khushal')
//Define mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    PhoneNo : Number,
    Email: String,
    Address: String,
    concern: String,

  });

//making model
const contact = mongoose.model('contact', contactschema);

// EXPRESS SPECIFIC STUFF 
app.use('/static', express.static("static"))
app.set('views', path.join(__dirname, 'views')) // Set the views directory
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('Home.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})
app.get('/records', (req, res)=>{
    res.status(200).render('records.pug');
})

app.post("/contact", (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been send to the database")
    })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});