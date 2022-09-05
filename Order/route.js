const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const controller = require('./controller');
const validation = require('./validation');
const authorization = require('../Utilities/authorization');

router.use(bodyParser.json());
router.use(express.static('public'));

// get all orders
router.get('/read',   controller.readcustomer);

// insert multiple order 
router.post('/insert',   authorization.verifyToken, controller.placeorder);

// get order by ID
router.get('/readid',    authorization.verifyToken, validation.adduservalidation, controller.readcustomerid);

// delete order
router.delete('/delete', authorization.verifyToken, validation.adduservalidation, controller.deletecustomer);

// update order
router.post('/update', authorization.verifyToken,   validation.adduservalidation, controller.updatecustomerdetail);

// signup order 
router.post('/signup', validation.adduservalidation, controller.signupcustomer);

// signin order
router.post('/signin', validation.addsigninvalidation, controller.signincustomer);

// readordersid
router.get('/readorder',   authorization.verifyToken, controller.readordersid);


module.exports = router;