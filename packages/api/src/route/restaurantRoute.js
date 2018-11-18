const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurantController');

router.get('/:id',  restaurantController.getRestaurantByID());

router.post('/', restaurantController.addRestaurant());

router.put('/:id', restaurantController.updateRestaurant());

router.delete('/:id', restaurantController.delRestaurant());

module.exports = router;