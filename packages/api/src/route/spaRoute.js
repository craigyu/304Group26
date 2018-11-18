const express = require('express');
const router = express.Router();
const spaController = require('../controller/spaController');

router.get('/:id',  spaController.getSpaByID());

router.post('/', spaController.addSpa());

router.put('/:id', spaController.updateSpa());

router.delete('/:id', spaController.delSpa());

module.exports = router;