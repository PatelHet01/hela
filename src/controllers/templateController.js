const axios = require('axios');
const Template = require('../models/Template');

// Utility to fetch WhatsApp templates directly from Meta Business Account
exports.syncTemplates = async (req, res) => {
    try {
        const workspaceId = req.user._id; // Realistically from route param or workspace token
        // In a real SaaS, WHATSAPP_PHONE_ID and TOKEN would be looked up from the Workspace model
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const accessToken = process.env.WHATSAPP_TOKEN;

        // Fetch WhatsApp Business Account ID (WABA) first, or from ENV
        const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

        if (!wabaId || !accessToken) {
            return res.status(400).json({ error: 'Missing Meta API credentials in environment' });
        }

        const url = `https://graph.facebook.com/v19.0/${wabaId}/message_templates`;
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const templates = response.data.data;
        let syncedCount = 0;

        for (const tmpl of templates) {
            // Upsert template into our DB.
            // Notice we save 'components' - this is critical for rendering "super attractive templates"
            // with headers, images, bodies, and interactive buttons on our frontend later.
            await Template.findOneAndUpdate(
                { metaTemplateId: tmpl.id },
                {
                    workspaceId,
                    name: tmpl.name,
                    language: tmpl.language,
                    status: tmpl.status.toUpperCase(),
                    category: tmpl.category,
                    components: tmpl.components,
                    metaTemplateId: tmpl.id
                },
                { upsert: true, new: true }
            );
            syncedCount++;
        }

        res.status(200).json({
            message: `Successfully synced ${syncedCount} templates from Meta`,
            syncedCount
        });

    } catch (error) {
        console.error('Template Sync Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to sync templates from Meta' });
    }
};

exports.getTemplates = async (req, res) => {
    try {
        const workspaceId = req.user._id;
        const templates = await Template.find({ workspaceId });
        res.status(200).json({ templates });
    } catch (error) {
        console.error('Fetch Templates Error:', error.message);
        res.status(500).json({ error: 'Server error fetching templates' });
    }
};
