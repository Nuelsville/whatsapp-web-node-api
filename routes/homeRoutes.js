// homeRoutes.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {getLoggedInUser} = require('../controllers/userController')

const router = express.Router();

// Home route
// router.get('/home', authMiddleware, getLoggedInUser);

module.exports = router;
