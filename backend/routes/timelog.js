const express = require('express');
const router = express.Router();
const timeLogController = require('../controllers/timeLogController');
const auth = require('../middleware/auth');

router.post('/start', auth, timeLogController.startTimeLog);
router.post('/stop', auth, timeLogController.stopTimeLog);
router.get('/', auth, timeLogController.getTimeLogs);
router.get('/total/:taskId', auth, timeLogController.getTaskTotalTime);

module.exports = router;
