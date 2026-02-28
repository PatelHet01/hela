const crypto = require('crypto');
const WhatsAppService = require('../services/whatsappService');

// Handles Meta's Webhook Verification
exports.verifyWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode && token) {
        if (mode === 'subscribe' && token === verifyToken) {
            console.log('✅ Webhook verified successfully!');
            return res.status(200).send(challenge);
        } else {
            console.error('❌ Webhook verification failed.');
            return res.sendStatus(403);
        }
    }
    res.sendStatus(400);
};

// Handles incoming WhatsApp events (messages, status updates)
exports.handleEvent = async (req, res) => {
    // Send 200 OK immediately as per Meta's requirement
    res.sendStatus(200);

    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
        body.entry.forEach(entry => {
            const changes = entry.changes;

            changes.forEach(change => {
                const value = change.value;

                // 1. Handle incoming message
                if (value.messages && value.messages.length > 0) {
                    const message = value.messages[0];
                    const from = message.from; // Sender's WhatsApp number
                    const messageBody = message.type === 'text' ? message.text.body : '[Media/Other Message]';

                    console.log(`💬 New Message from ${from}: ${messageBody}`);

                    // Future Phase: Route this to DB or Auto-Responder
                }

                // 2. Handle Message Status Updates (sent, delivered, read, failed)
                if (value.statuses && value.statuses.length > 0) {
                    const statusObj = value.statuses[0];
                    console.log(`✅ Message Status update for ID ${statusObj.id}: ${statusObj.status}`);

                    if (statusObj.errors) {
                        console.error('❌ Delivery Error:', statusObj.errors);
                    }

                    // Future Phase: Update Campaign Log DB
                }
            });
        });
    }
};
