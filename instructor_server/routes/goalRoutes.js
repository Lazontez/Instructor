const express = require('express');
const router = express.Router();
const Goal = require('../models/goalModel');
const mongoose = require('mongoose')
const testID = new mongoose.Types.ObjectId(); 
const authMiddleware = require('../middleware/authenticationMiddleware')

// Test Data Above For UserID

// Create a new goal
router.post('/c',authMiddleware, async (req, res) => {
  try {
    const { name, description, userId, subtasks } = req.body;

    const newGoal = new Goal({
      name,
      description,
      userId: testID,
      subtasks,
      goalId: '5'
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    console.log
    res.status(500).json({ message: 'Failed to create goal' });
  }
});
// Remove a goal
router.delete('/r/:goalId',authMiddleware, async (req, res) => {
  try {
    const result = await Goal.deleteOne({ _id: req.params.goalId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Failed to delete goal', error: err.message });
  }
});

// Update a Goal
router.put('/u/:goalId', authMiddleware , async (req, res) => {
  const { goalId } = req.params;
  const updatedData = req.body;
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(goalId, updatedData, { new: true });
    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update goal', error: err.message });
  }
});

// Get all goals for a user
router.get('/g/:userId',authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
});

module.exports = router;

