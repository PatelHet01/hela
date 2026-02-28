const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    hasOptedIn: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Ensure a phone number is unique per workspace
contactSchema.index({ workspaceId: 1, phoneNumber: 1 }, { unique: true });

module.exports = mongoose.model('Contact', contactSchema);
