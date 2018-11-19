const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');

router.get('/user/:id',  reservationController.getReservationByUserID());

router.post('/', reservationController.addReservation());

router.put('/:id', reservationController.updateReservation());

router.delete('/:id', reservationController.delReservation());

module.exports = router;