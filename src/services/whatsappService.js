const axios = require('axios');

class WhatsAppService {
    constructor(accessToken, phoneNumberId) {
        this.accessToken = accessToken;
        this.phoneNumberId = phoneNumberId;
        this.baseURL = `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`;

        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Send a basic text message
     * @param {string} to - Recipient phone number with country code
     * @param {string} text - Message body
     */
    async sendTextMessage(to, text) {
        try {
            const payload = {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: to,
                type: 'text',
                text: { preview_url: true, body: text }
            };
            const response = await this.client.post('', payload);
            return response.data;
        } catch (error) {
            console.error('WhatsApp API Error (Text):', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    /**
     * Send a Template Message (Supports Rich Media & Buttons)
     * @param {string} to - Recipient phone number
     * @param {string} templateName - Name of the approved template
     * @param {string} languageCode - Language code (e.g., 'en_US')
     * @param {Array} components - Array of component objects (header media, body variables, button payloads)
     */
    async sendTemplateMessage(to, templateName, languageCode = 'en_US', components = []) {
        try {
            const payload = {
                messaging_product: 'whatsapp',
                to: to,
                type: 'template',
                template: {
                    name: templateName,
                    language: {
                        code: languageCode
                    },
                    components: components
                }
            };
            const response = await this.client.post('', payload);
            return response.data;
        } catch (error) {
            console.error('WhatsApp API Error (Template):', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
            throw error;
        }
    }
}

module.exports = WhatsAppService;
