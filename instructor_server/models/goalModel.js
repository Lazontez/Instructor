const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }]
});

module.exports = mongoose.model('Goal', goalSchema);
