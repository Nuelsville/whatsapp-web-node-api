const express = require('express');
const { sendNotifications } = require('../controllers/notificationController');

const router = express.Router();

router.get('/notification', sendNotifications);

module.exports = router;
