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
let db = {};

//*********************************************************/

router.get('/', (req, res) => {

    res.json({
        'hello': 'hi'
    });
});

router.post('/syncData', (req, res) => {

    let data = req.body;

    //console.log("sendData :: body = " + JSON.stringify(body, null, 2));


    // check if there are records for this family
    if (db.hasOwnProperty(data.family)) {
        console.log("sendData :: family " + data.family + " found");

        updateData(data);
    }
    else {
        console.log("sendData :: family " + data.family + " not found");

        addData(data);
    }

    //console.log("db = " + JSON.stringify(db, null, 2));

    res.json({ response: db[data.family], error: false });
});

let addData = function (extData) {
    console.log("addData :: called");

    let shops = [];

    extData.data.forEach(function (extShop) {
        if (!extShop.deleted) {

            let products = [];
            if (extShop.products.length > 0) {

                extShop.products.forEach(function (extProduct) {
                    if (!extProduct.deleted) {
                        products.push(extProduct);
                    }
                });
            }

            extShop.products = products;

            shops.push(extShop);
        }
    });

    db[extData.family] = shops;


    console.log("addData :: db[extData.family] = " + JSON.stringify(db[extData.family], null, 2));
};

let updateData = function (extData) {
    console.log("updateData :: called");

    // iterate over shops, comapre data and add/update items
    extData.data.forEach(function (extShop) {
        console.log("updateData :: extShop = " + JSON.stringify(extShop, null, 2));

        if (extShop.deleted) {

            console.log("updateData :: delete shop");

            let existingShop = db[extData.family].find(item => {
                return item.name === extShop.name;
            });

            if (existingShop) {

                if (existingShop.date < extShop.date) {
                    console.log("updateData :: shop found in DB and its date is older than new shop date. So we need to delete it");

                    let existingShopIndex = db[extData.family].findIndex(item => {
                        return item.name === extShop.name;
                    });

                    db[extData.family].splice(existingShopIndex, 1);
                }
                else {
                    console.log("updateData :: shop found in DB but its date is same or newer. So no need to delete");
                }
            }
            else {
                console.log("updateData :: no need to delete, as shop not found in DB");
            }
        }
        else {

            console.log("updateData :: update shop");

            let existingShop = db[extData.family].find(item => {
                return item.name === extShop.name;
            });

            if (existingShop) {

                if (existingShop.date < extShop.date) {

                    console.log("updateData :: shop found in DB and its date is older than new shop date. So we need to update it");

                    if (extShop.products.length > 0) {

                        extShop.products.forEach(function (extProduct) {

                            if (extProduct.deleted) {
                                console.log("updateData :: delete product");

                                let existingProduct = existingShop.products.find(item => {
                                    return item.name === extProduct.name;
                                });

                                if (existingProduct) {

                                    if (existingProduct.date < extProduct.date) {
                                        console.log("updateData :: product found in DB and its date is older than new product date. So we need to delete it");

                                        let existingProductIndex = existingShop.products.findIndex(item => {
                                            return item.name === extProduct.name;
                                        });

                                        existingShop.products.splice(existingProductIndex, 1);
                                    }
                                    else {
                                        console.log("updateData :: product found in DB but its date is same or newer. So no need to delete");
                                    }
                                }
                                else {
                                    console.log("updateData :: no need to delete, as product not found in DB");
                                }
                            }
                            else {

                                let existingProduct = existingShop.products.find(item => {
                                    return item.name === extProduct.name;
                                });

                                if (existingProduct) {

                                    if (existingProduct.date < extProduct.date) {

                                        console.log("updateData :: product found in DB and its date is older than new product date. So we need to update it");

                                        let existingProductIndex = existingShop.products.findIndex(item => {
                                            return item.name === extProduct.name;
                                        });

                                        existingShop.products[existingProductIndex] = extProduct;
                                    }
                                    else {
                                        console.log("updateData :: product found in DB but its date is same or newer. So no need to delete");
                                    }
                                }
                                else {
                                    console.log("updateData :: add product");

                                    existingShop.products.push(extProduct);
                                }
                            }
                        });
                    }
                }
                else {
                    console.log("updateData :: no need to update shop, but still need to check its products");

                    if (extShop.products.length > 0) {

                        extShop.products.forEach(function (extProduct) {

                            if (extProduct.deleted) {
                                console.log("updateData :: delete product");

                                let existingProduct = existingShop.products.find(item => {
                                    return item.name === extProduct.name;
                                });

                                if (existingProduct) {

                                    if (existingProduct.date < extProduct.date) {
                                        console.log("updateData :: product found in DB and its date is older than new product date. So we need to delete it");

                                        let existingProductIndex = existingShop.products.findIndex(item => {
                                            return item.name === extProduct.name;
                                        });

                                        existingShop.products.splice(existingProductIndex, 1);
                                    }
                                    else {
                                        console.log("updateData :: product found in DB but its date is same or newer. So no need to delete");
                                    }
                                }
                                else {
                                    console.log("updateData :: no need to delete, as product not found in DB");
                                }
                            }
                            else {

                                let existingProduct = existingShop.products.find(item => {
                                    return item.name === extProduct.name;
                                });

                                if (existingProduct) {

                                    if (existingProduct.date < extProduct.date) {

                                        console.log("updateData :: product found in DB and its date is older than new product date. So we need to update it");

                                        let existingProductIndex = existingShop.products.findIndex(item => {
                                            return item.name === extProduct.name;
                                        });

                                        existingShop.products[existingProductIndex] = extProduct;
                                    }
                                    else {
                                        console.log("updateData :: product found in DB but its date is same or newer. So no need to delete");
                                    }
                                }
                                else {
                                    console.log("updateData :: add product");

                                    existingShop.products.push(extProduct);
                                }
                            }
                        });
                    }

                }
            }
            else {
                console.log("updateData :: add shop");

                db[extData.family].push(extShop);
            }
        }

        console.log("#############################################################################");
    });
};



//*********************************************************/

if (devMode) {
    app.use(cors({
        origin: '*'
    }));
}

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);