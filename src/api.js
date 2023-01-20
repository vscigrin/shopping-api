const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const router = express.Router();


// DB Objects
let users = [];
let shops = [];
let products = [];

router.get('/', (req, res) => {

    res.json({
        'hello': 'hi'
    });
});

// users
router.get('/getUsers', (req, res) => {

    res.json(users);
});

router.post('/addUser', (req, res) => {

    let name = req.body.name;
    let email = req.body.email;

    users.push({ "name": name, "email": email });

    res.json({ response: 'User successfully added.', error: false });
});

// shops
router.get('/getShops', (req, res) => {

    res.json(shops);
});

router.post('/addShop', (req, res) => {

    let name = req.body.name;
    let email = req.body.email;

    shops.push({ "name": name, "email": email });

    res.json({ response: 'Shop successfully added.', error: false });
});

// products
router.get('/getProducts', (req, res) => {

    res.json(products);
});

router.post('/addProduct', (req, res) => {

    let name = req.body.name;
    let email = req.body.email;

    products.push({ "name": name, "email": email });

    res.json({ response: 'Product successfully added.', error: false });
});






app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);