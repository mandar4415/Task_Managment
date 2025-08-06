const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const auth = require('../middleware/auth');

router.get('/daily', auth, summaryController.getDailySummary);

module.exports = router;
