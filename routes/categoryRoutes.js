// authRoutes.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createCategory, getAllCategory } = require('../controllers/categoryController');

const router = express.Router();

// Registration route
router.post('/category', authMiddleware, createCategory);

// Login route
router.get('/category', getAllCategory);

module.exports = router;
