const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const goalRoutes = require('./routes/goalRoutes');
const subtaskRoutes = require('./routes/subTask');
const authRoutes = require('./routes/authenticanRoutes')
const cors = require('cors');
const allowedOrigins = [
    'http://localhost:5173', 
    'https://testinstructor.netlify.app', 
  ];

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// Connect to DB
connectDB();

// Routes
app.use('/api/goals', goalRoutes);
app.use('/api/subtasks', subtaskRoutes)
app.use('/api/user', authRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
