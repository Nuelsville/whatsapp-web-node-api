// authRoutes.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addSubscriber, editSubscriber, getAllSubscribers } = require('../controllers/subscriberController');

const router = express.Router();

router.post('/subscriber', authMiddleware, addSubscriber);

router.get('/subscriber', getAllSubscribers);

router.put('/subscriber/:id', editSubscriber)

module.exports = router;
