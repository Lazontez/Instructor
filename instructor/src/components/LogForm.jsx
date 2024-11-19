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
      <input
        className="log-form__input-field"
        type="text"
        value={taskText}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button className="log-form__submit-btn" type="submit">Add Task</button>
    </form>
  );
};

export default LogForm;