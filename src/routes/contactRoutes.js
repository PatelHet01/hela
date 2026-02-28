const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/', contactController.createContact);
router.get('/', contactController.getContacts);

module.exports = router;
