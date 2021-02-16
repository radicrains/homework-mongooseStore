//EXPRESS APP DEPENDENCIES
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//METHOD OVERRIDE DEPENDENCIES
const methodOverride = require('method-override');

//DATAS || MODELS SCHEMAS
// const Product = require('./models/products.js');
const productsController = require('./controllers/products.js');

//DOTENV DEPENDENCIES
require('dotenv').config();

//MONGOOSE SERVER DEPENDENCIES / CONFIGURATIONS
const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/store';
const db = mongoose.connection;
mongoose.connect(`${process.env.mongoURL}`, {useNewUrlParser: true, useUnifiedTopology: true});


// MONGOOSE CONNECTION ERROR / SUCCESS
db.once('open', () => console.log('connected to mongo'));
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


//MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/products', productsController);
app.use(express.static('public'));



//LISTENING ROUTE / PORT
app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});
