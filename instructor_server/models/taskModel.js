const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }, // Reference to the Goal
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
