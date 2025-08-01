const express = require('express');
const databaseConnection = require('./config/db');
const bookRoutes = require('./routes/book.routes');

databaseConnection();


const cors = require('cors');
const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/book', bookRoutes);
app.use('/books', bookRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
