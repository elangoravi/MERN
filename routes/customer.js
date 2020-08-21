const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController')

// GET CUSTOMER LIST
router.get('/customers', CustomerController.Customer_List);

//GET
router.get('/customer/:name', CustomerController.Customer_get);

//POST
router.post('/customer', CustomerController.Customer_post);

//DELETE
router.post('/customer/:name/delete', CustomerController.Customer_delete);

//UPDATE_POST
router.post('/customer/:name/update', CustomerController.Customer_update);

module.exports = router;