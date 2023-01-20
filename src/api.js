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

    users = [
        { "email": "vitalij.scigrin@gmail.com", "name": "Vitalij" },
        { "email": "arina.avdejeva@gmail.com", "name": "Arina" },
        { "email": "ksenia.scigrin@gmail.com", "name": "Ksenia" },
        { "email": "polina.scigrin@gmail.com", "name": "Polina" }
    ];

    res.json(users);
});

router.post('/addUser', (req, res) => {

    let name = req.body.name;
    let email = req.body.email;

    console.log("addUser called with params: name = " + name + " and email = " + email);

    //res.set('Content-Type', 'application/json');
    //res.status(200).send({ response: 'User successfully added.', error: '' });
    res.json({ response: 'User successfully added.', error: false });
});

// shops
router.get('/getShops', (req, res) => {

    res.json(shops);
});

// products
router.get('/getProducts', (req, res) => {

    res.json(products);
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);