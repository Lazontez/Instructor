const express = require('express');
const router = express.Router();
const Goal = require('../models/goalModel');
const authMiddleware = require('../middleware/authenticationMiddleware')

// Add Subtask
router.post('/a/:goalId', authMiddleware , async (req, res) => {
    const { name, status } = req.body;
    const goalId = req.params.goalId;

    try {
        // Create the new subtask object
        const newSubtask = { name, status };

        // Update the goal by adding the new subtask
        const updatedGoal = await Goal.findByIdAndUpdate(
            goalId,
            { $push: { subtasks: newSubtask } },
            { new: true, runValidators: true }  
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(201).json({ message: 'Subtask added', goal: updatedGoal });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add subtask', error: error.message });
    }
});



// Other subtask routes (update, delete) go here...

module.exports = router;
