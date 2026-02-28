const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/sync', templateController.syncTemplates);
router.get('/', templateController.getTemplates);

module.exports = router;
