const express = require('express');
const router = express.Router();
const gymController = require('../controller/gymController');

router.get('/:id',  gymController.getGymByID());

router.post('/', gymController.addGym());

// router.put('/:id', gymController.updateGym());
//
// router.delete('/:id', gymController.delGym());

module.exports = router;