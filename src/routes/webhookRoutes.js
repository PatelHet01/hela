const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Meta verify challenge
router.get('/', webhookController.verifyWebhook);

// Real-time events
router.post('/', webhookController.handleEvent);

module.exports = router;
