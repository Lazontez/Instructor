const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['not-started', 'in-progress', 'completed'], default: 'not-started' },
});

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  subtasks: [subtaskSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;


