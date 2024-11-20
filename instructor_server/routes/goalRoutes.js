const express = require('express');
const router = express.Router();
const Goal = require('../models/goalModel');

// Create a new goal
router.post('/', async (req, res) => {
    console.log(req.body)
  try {
    const { name, description, userId, subtasks } = req.body;

    const newGoal = new Goal({
      name,
      description,
      userId,
      subtasks,
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create goal' });
  }
});

// Get all goals for a user
router.get('/:userId', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
});

module.exports = router;


