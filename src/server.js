require('dotenv').config();
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const server = http.createServer(app);

async function startServer() {
    try {
        if (MONGO_URI) {
            await mongoose.connect(MONGO_URI);
            console.log('✅ Connected to MongoDB');
        } else {
            console.warn('⚠️ MONGO_URI not provided. Skipping database connection.');
        }

        server.listen(PORT, () => {
            console.log(`🚀 HELA Server running on port ${PORT}`);
            if (process.send) {
                process.send('ready');
            }
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();
