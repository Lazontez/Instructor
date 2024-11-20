const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Reference to the Task
});

module.exports = mongoose.model('Subtask', subtaskSchema);
