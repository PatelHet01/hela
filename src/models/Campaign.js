const mongoose = require('mongoose');

const messageLogSchema = new mongoose.Schema({
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true
    },
    metaMessageId: {
        // The ID returned by Meta upon successful dispatch
        type: String
    },
    status: {
        type: String,
        enum: ['PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'],
        default: 'PENDING'
    },
    errorReason: {
        type: String,
        default: null
    }
}, { timestamps: true });

const campaignSchema = new mongoose.Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: true
    },
    tags: [{
        // Targeting contacts who have ANY of these tags
        type: String
    }],
    status: {
        type: String,
        enum: ['DRAFT', 'SCHEDULED', 'RUNNING', 'COMPLETED', 'FAILED'],
        default: 'DRAFT'
    },
    scheduledAt: {
        type: Date,
        default: Date.now // Default to immediate
    },
    // Metrics cache
    totalSent: { type: Number, default: 0 },
    totalDelivered: { type: Number, default: 0 },
    totalRead: { type: Number, default: 0 },
    totalFailed: { type: Number, default: 0 }

}, { timestamps: true });

module.exports = {
    Campaign: mongoose.model('Campaign', campaignSchema),
    MessageLog: mongoose.model('MessageLog', messageLogSchema)
};
