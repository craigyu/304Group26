const express = require('express');
const router = express.Router();
const queryController = require('../controller/queryController');

router.get('/view',  queryController.demoView());
router.get('/join',  queryController.demoJoin());
router.get('/group_by',  queryController.demoGroup());
router.get('/division',  queryController.demoDivision());

module.exports = router;