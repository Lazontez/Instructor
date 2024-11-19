import React, { useState } from 'react';
import '../utils/LogForm.css'; // Import the CSS for styling

function LogForm({ addTask }) {
  const [taskText, setTaskText] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (e) => {
    const regex = /^[a-zA-Z0-9\s.,!?()_-]*$/;
    const value = e.target.value;
    if (regex.test(value)) {
      setTaskText(value);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask({
        id: Date.now(),
        name: taskText,
        description: description,
        status: isCompleted ? 'completed' : 'in-progress',
      });
      setTaskText('');
      setDescription('');
      setIsCompleted(false);
    }
  };

  return (
    <form className="log-form" onSubmit={handleSubmit}>
      {/* Input Field for Task Name */}
      <input
        className="log-form__input"
        type="text"
        value={taskText}
        onChange={handleInputChange}
        placeholder="Add a task"
        maxLength={50}
      />

      {/* Description Textarea */}
      <textarea
        className="log-form__textarea"
        placeholder="Task description (optional)"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>

      {/* Checkbox for Completed Status */}
      <label className="log-form__checkbox-label">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
          className="log-form__checkbox"
        />
        Mark as completed
      </label>

      {/* Submit Button */}
      <button
        className="log-form__submit-btn"
        type="submit"
        disabled={!taskText.trim()}
      >
        Add Task
      </button>
    </form>
  );
}

export default LogForm;

