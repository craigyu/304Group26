const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');

router.get('/:id', accountController.getAccountByUserID());

router.post('/', accountController.addAccount());

router.put('/:id', accountController.updateAccount());

router.delete('/:id', accountController.delAccount());

module.exports = router;