const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

router.get('/:id',  employeeController.getEmployeeByID());

router.post('/', employeeController.addEmployee());

router.put('/:id', employeeController.updateEmployee());

router.delete('/:id', employeeController.delEmployee());

module.exports = router;