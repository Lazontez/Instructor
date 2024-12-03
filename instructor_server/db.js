const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/devdb";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};


module.exports = connectDB;
