import React from 'react';
import '../utils/Task.css'; // Assuming this is where the styles are located

const TaskList = ({ tasks, removeTask, editTask }) => {
  
  const openEditModal = (task) => {
    console.log('Editing task: ', task); // Log the task to verify it's correct
    editTask(task); // Pass the task to the parent component
  };

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span className="task-item__text">{task.name}</span>
            <button
              className="task-item__button task-item__button--edit"
              onClick={() => openEditModal(task)} // Ensure the task is passed here
            >
              Edit
            </button>
            <button
              className="task-item__button task-item__button--remove"
              onClick={() => removeTask(task.id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="task-list__empty">No tasks available</p> // Message when no tasks are available
      )}
    </div>
  );
};

export default TaskList;


