const mongoose = require('mongoose');

const databaseConnection = async() =>{
    // Check if we're in production (Render.com) or local development
    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;
    
    let MONGODB_URI;
    
    if (isProduction) {
        // In production, we must use Atlas
        MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            console.error('❌ MONGODB_URI environment variable is required in production!');
            console.error('Please set MONGODB_URI in Render.com environment variables');
            process.exit(1);
        }
    } else {
        // In development, use local MongoDB
        MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookstore';
    }
    
    console.log('Connecting to database...');
    console.log('Environment:', isProduction ? 'Production' : 'Development');
    console.log('MongoDB URI:', MONGODB_URI);
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.log("❌ Database Connect error:", error.message);
        if (!isProduction) {
            console.log("💡 Make sure MongoDB is running on your local machine");
        } else {
            console.log("💡 Please check your MONGODB_URI in Render.com environment variables");
        }
        process.exit(1);
    }
}

module.exports = databaseConnection;