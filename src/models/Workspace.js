const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    whatsappNumberId: {
        type: String,
        default: null
    },
    whatsappAccessToken: {
        type: String,
        default: null // In a real prod environment, this should be encrypted
    }
}, { timestamps: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
