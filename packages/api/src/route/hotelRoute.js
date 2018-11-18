const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');

router.get('/',  hotelController.getHotel());

router.post('/', hotelController.addHotel());

router.put('/:id', hotelController.updateHotel());

router.delete('/:id', hotelController.delHotel());

module.exports = router;