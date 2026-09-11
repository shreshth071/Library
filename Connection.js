const mongoose = require('mongoose');

let isConnected = false;

async function connection() {
    if (isConnected || mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }
    if (!process.env.MONGODB_URI) {
        console.warn("Warning: MONGODB_URI is not defined in environment variables.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("DB Connected successfully");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}

module.exports = connection;