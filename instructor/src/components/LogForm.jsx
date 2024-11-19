import React, { useState } from 'react';
import '../utils/LogForm.css'; // Import the CSS for styling

function LogForm({ addTask }) {
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask({ id: Date.now(), name: taskText });
      setTaskText('');
    }
  };

  return (
    <form className="log-form" onSubmit={handleSubmit}>
      {/* Input Field */}
      <input
        className="log-form__input"
        type="text"
        value={taskText}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      
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
};

export default LogForm;
