const express = require('express');
const router = express.Router();
const amenityController = require('../controller/amenityController');

router.get('/hotel/:id',  amenityController.getAmenityByHotelID());

router.post('/', amenityController.addAmenity());

router.put('/:id', amenityController.updateAmenity());

router.delete('/:id', amenityController.delAmenity());

module.exports = router;