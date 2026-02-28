const { Campaign, MessageLog } = require('../models/Campaign');
const Contact = require('../models/Contact');
const Template = require('../models/Template');
const WhatsAppService = require('../services/whatsappService');

exports.createCampaign = async (req, res) => {
    try {
        const workspaceId = req.user._id;
        const { name, templateId, tags, scheduledAt } = req.body;

        if (!name || !templateId) {
            return res.status(400).json({ error: 'Campaign name and templateId are required' });
        }

        const template = await Template.findOne({ _id: templateId, workspaceId });
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        const campaign = await Campaign.create({
            workspaceId,
            name,
            templateId,
            tags: tags || [],
            scheduledAt: scheduledAt ? new Date(scheduledAt) : Date.now(),
            status: scheduledAt ? 'SCHEDULED' : 'RUNNING'
        });

        res.status(201).json({ message: 'Campaign created', campaign });

        // If not scheduled for later, execute immediately in background
        if (!scheduledAt || new Date(scheduledAt) <= Date.now()) {
            this.executeCampaign(campaign._id, workspaceId);
        }

    } catch (error) {
        console.error('Create Campaign Error:', error);
        res.status(500).json({ error: 'Server error creating campaign' });
    }
};

exports.executeCampaign = async (campaignId, workspaceId) => {
    try {
        const campaign = await Campaign.findById(campaignId).populate('templateId');
        if (!campaign) return;

        // Fetch contacts matching ANY of the campaign tags
        const contactsQuery = { workspaceId, hasOptedIn: true };
        if (campaign.tags && campaign.tags.length > 0) {
            contactsQuery.tags = { $in: campaign.tags };
        }
        const contacts = await Contact.find(contactsQuery);

        if (contacts.length === 0) {
            campaign.status = 'FAILED';
            await campaign.save();
            return console.log(`[!] Campaign ${campaignId} failed: No matching contacts.`);
        }

        campaign.status = 'RUNNING';
        await campaign.save();

        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const accessToken = process.env.WHATSAPP_TOKEN;
        const waService = new WhatsAppService(accessToken, phoneId);

        let sentCount = 0;
        let failedCount = 0;

        // Loop through and send (in Phase 2 this should be moved to a Redis Queue)
        for (const contact of contacts) {
            const msgLog = new MessageLog({
                campaignId: campaign._id,
                contactId: contact._id
            });

            try {
                // Here is where we handle the "Super Attractive Templates"
                // The components logic maps variables to placeholders dynamically. 
                // Currently keeping this basic, but structure exists to pass parsed rich media headers/buttons
                const waRes = await waService.sendTemplateMessage(
                    contact.phoneNumber,
                    campaign.templateId.name,
                    campaign.templateId.language,
                    [] // We pass components here for rich media variables
                );

                if (waRes.messages && waRes.messages[0]) {
                    msgLog.metaMessageId = waRes.messages[0].id;
                    msgLog.status = 'SENT';
                    sentCount++;
                }

            } catch (err) {
                msgLog.status = 'FAILED';
                msgLog.errorReason = err.message || 'WhatsApp API Error';
                failedCount++;
            }

            await msgLog.save();
        }

        campaign.status = 'COMPLETED';
        campaign.totalSent = sentCount;
        campaign.totalFailed = failedCount;
        await campaign.save();

        console.log(`✅ Campaign ${campaignId} Finished. Sent: ${sentCount}, Failed: ${failedCount}`);

    } catch (error) {
        console.error('Execute Campaign Error:', error);
        await Campaign.findByIdAndUpdate(campaignId, { status: 'FAILED' });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ workspaceId: req.user._id }).populate('templateId');
        res.status(200).json({ campaigns });
    } catch (error) {
        console.error('Get Campaigns Error:', error);
        res.status(500).json({ error: 'Server error fetching campaigns' });
    }
};
