const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const router = express.Router();

//*********************************************************/

const devMode = true;

//*********************************************************/

// DB Objects
let users = [];
let shops = [];
let products = [];

//*********************************************************/

router.get('/', (req, res) => {

    res.json({
        'hello': 'hi'
    });
});

router.post('/sendData', (req, res) => {

    let body = req.body;

    console.log("sendData :: body = " + JSON.stringify(body, null, 2));

    res.json({ response: 'Sync data received.', error: false });
});


//*********************************************************/

if (devMode) {
    app.use(cors({
        origin: '*'
    }));
}

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);