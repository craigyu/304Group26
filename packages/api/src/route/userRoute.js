const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/:id',  userController.getUserByID());

router.post('/', userController.addUser());

router.put('/:id', userController.updateUser());

router.delete('/:id', userController.delUser());

module.exports = router;