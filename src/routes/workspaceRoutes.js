const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/', workspaceController.createWorkspace);
router.get('/', workspaceController.getWorkspaces);

module.exports = router;
