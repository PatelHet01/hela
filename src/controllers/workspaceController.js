const Workspace = require('../models/Workspace');

exports.createWorkspace = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Workspace name is required' });
        }

        const workspace = await Workspace.create({
            name,
            ownerId: req.user._id
        });

        res.status(201).json({
            message: 'Workspace created successfully',
            workspace
        });
    } catch (error) {
        console.error('Create Workspace Error:', error);
        res.status(500).json({ error: 'Server error creating workspace' });
    }
};

exports.getWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({ ownerId: req.user._id });
        res.status(200).json({ workspaces });
    } catch (error) {
        console.error('Fetch Workspaces Error:', error);
        res.status(500).json({ error: 'Server error fetching workspaces' });
    }
};
