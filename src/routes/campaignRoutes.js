const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getCampaigns);

module.exports = router;
