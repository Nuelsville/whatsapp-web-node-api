const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addContent, editContent, getAllContent, deleteContent } = require('../controllers/contentController')

const router = express.Router();

router.post('/content', authMiddleware, addContent);
router.put('/content/:id', authMiddleware, editContent);
router.delete('/content/:id', authMiddleware, deleteContent);
router.get('/content', getAllContent);

module.exports = router;
