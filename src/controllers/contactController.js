const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
    try {
        const { name, phoneNumber, tags } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ error: 'Phone number is required' });
        }

        const contact = await Contact.create({
            workspaceId: req.user._id,
            name,
            phoneNumber,
            tags: tags || []
        });

        res.status(201).json({ message: 'Contact created securely', contact });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Contact already exists with this phone number' });
        }
        res.status(500).json({ error: 'Server error creating contact' });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ workspaceId: req.user._id });
        res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching contacts' });
    }
};
