const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
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
    language: {
        type: String,
        required: true,
        default: 'en_US'
    },
    status: {
        type: String,
        enum: ['APPROVED', 'PENDING', 'REJECTED', 'DELETED'],
        default: 'PENDING'
    },
    category: {
        type: String,
        enum: ['MARKETING', 'UTILITY', 'AUTHENTICATION'],
        required: true
    },
    components: {
        // This array holds the rich structure of the template (HEADER, BODY, FOOTER, BUTTONS)
        type: Array,
        default: []
    },
    metaTemplateId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

// Ensure unique template name per workspace
templateSchema.index({ workspaceId: 1, name: 1, language: 1 }, { unique: true });

module.exports = mongoose.model('Template', templateSchema);
