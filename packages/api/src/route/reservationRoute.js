const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');

router.get('/:id',  reservationController.getReservationByID());

router.post('/', reservationController.addReservation());

router.put('/:id', reservationController.updateReservation());

router.delete('/:id', reservationController.delReservation());

module.exports = router;