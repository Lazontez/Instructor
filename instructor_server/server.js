const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

// Initialize the app
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Simple route
app.get('/', (req, res) => {
  res.send('Instructor Server is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
