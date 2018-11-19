const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');

router.get('/hotel/:id',  roomController.getRoomByHotelID());
//
// router.post('/', roomController.addRoom());

router.put('/:id', roomController.updateRoom());

router.delete('/:id', roomController.delRoom());

module.exports = router;