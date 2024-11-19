import React from 'react';
import '../utils/Task.css'; // Import the CSS for styling

const TaskList = ({ tasks , removeTask, editTask }) => {

  function getNewText(taskName) {
    const newText = window.prompt('What would you like to update the task name to?', taskName);

    // Regular expression to check for invalid characters (@, #, >, <, etc.)
    const invalidCharsRegex = /[<>@#]/;

    // If the user input something, check if it contains invalid characters
    if (newText && newText.trim()) {
      if (invalidCharsRegex.test(newText)) {
        alert("Invalid characters detected! Please remove characters like >, <, @, #.");
        return taskName;  // Keep the original task name if invalid characters are found
      } else {
        return newText.trim();  // Return the valid text
      }
    } else {
      alert("You must enter a task name!");  // Alert to notify user if input is invalid
      return taskName;  // Keep the original task name if no valid input
    }
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <span className="task-item__text">{task.name}</span>  {/* Use task.name */}
          <button
            className="task-item__button task-item__button--edit"
            onClick={() => editTask(task.id, getNewText(task.name))}
          >
            Edit
          </button>
          <button
            className="task-item__button task-item__button--remove"
            onClick={() => removeTask(task.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;