//EXPRESS APP DEPENDENCIES
const express = require('express');
const router = express.Router();

//DATAS || MODELS SCHEMAS
const Product = require('../models/products.js');


//CREATE NEW ROUTE (1. GET - NEW)
router.get('/add', (req, res) => {
    res.render('new.ejs');
});

//CREATE CREATE ROUTE (2. POST - CREATE)
router.post('/',(req,res)=> {
    Product.create(req.body, (error, createdProduct) =>{
        res.redirect('/products');
    });
    // res.render(req.body);
});

//CREATE INDEX ROUTE
router.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts
        });
    });
});

// CREATE SEED ROUTE
router.get('/seed', (req,res) =>{
    Product.create([
        {
            name: 'Beans',
            description: 'A small pile of beans. Buy more beans for a big pile of beans.',
            img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
            price: 5,
            qty: 99
        }, 
        {
            name: 'Bones',
            description: 'It\'s just a bag of bones.',
            img: 'http://bluelips.com/prod_images_large/bones1.jpg',
            price: 25,
            qty: 0
        }, 
        {
            name: 'Bins',
            description: 'A stack of colorful bins for your beans and bones.',
            img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
            price: 7000,
            qty: 1
        } 
    ], (err,data)=> {
        res.redirect('/products');
    });
});

//CREATE SHOW ROUTE
router.get('/:id',(req,res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
            // buy: buyItem =(foundProduct)=>{
            //     // foundProduct.qty = foundProduct.qty - 1;
            //     console.log(foundProduct.qty);
            // },
        });
    });
    
});




//CREATE DELETE ROUTE
router.delete('/:id',(req,res) => {
    Product.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/products');
    });
});

//CREATE EDIT ROUTE (1. GET)
router.get('/:id/edit', (req,res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct
        });
    });
});


//CREATE EDIT ROUTE (2. PUT)
router.put('/:id', (req,res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
        res.redirect('/products/'+req.params.id);
    });
});

// function buyItem() { 
//     return foundProduct.qty -=1 ;
// };

router.post('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id,{$inc: { qty:-1}},{ new: true },(err, updateModel) => {
            if (err) {
                console.log(err.message);
            } else {
                res.redirect('/products/'+req.params.id);
            }
        }
    );
});



module.exports = router;