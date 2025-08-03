require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/db');
const bookRoutes = require('./routes/book.routes');

databaseConnection();

const cors = require('cors');
const app = express();

// CORS configuration
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  credentials: true
}));

app.use(express.json());

app.use('/api/book', bookRoutes);
app.use('/api/books', bookRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
