const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');

router.get('/:id',  customerController.getCustomerByID());

router.post('/', customerController.addCustomer());

router.put('/:id', customerController.updateCustomer());

module.exports = router;