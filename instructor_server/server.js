const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const goalRoutes = require('./routes/goalRoutes');
const subtaskRoutes = require('./routes/subTask');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // For handling cross-origin requests

// Connect to DB
connectDB();

// Routes
app.use('/api/goals', goalRoutes);
app.use('/api/subtasks', subtaskRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
