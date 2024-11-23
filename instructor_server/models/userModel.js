const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, enum:['student' , 'teacher'], default:'student'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
