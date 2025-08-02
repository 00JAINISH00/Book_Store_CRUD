const mongoose = require('mongoose');

const databaseConnection = async() =>{
    // Use environment variable for MongoDB URI, fallback to local for development
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookstore';
    
    console.log('Connecting to database...');
    console.log('MongoDB URI:', MONGODB_URI);
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database Connect error:", error.message);
        console.log("Make sure MongoDB is running on your local machine");
        process.exit(1); // Exit if database connection fails
    }
}

module.exports = databaseConnection;