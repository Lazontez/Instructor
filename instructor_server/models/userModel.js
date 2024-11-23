const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  first_name:{type: String, required: false, unique: false},
  last_name:{type: String, required: false, unique: false},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, enum:['student' , 'teacher'], default:'student'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
