import React from 'react';
import '../utils/Task.css'; // Assuming this is where the styles are located

const TaskList = ({ tasks, removeTask, updateTaskProgress, editTask  }) => {
  
  const openEditModal = (task) => {
    console.log('Editing task: ', task); // Log the task to verify it's correct
    editTask(task); // Pass the task to the parent component
  };

  const calculateProgress = (subtasks) => {
    if (!subtasks || subtasks.length === 0) return 0;
    const completed = subtasks.filter((subtask) => subtask.status === 'completed').length;
    return Math.round((completed / subtasks.length) * 100);
};


  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-list__item">
            <span className="task-list__item-name">{task.name.toUpperCase()}</span>
            <div className="task-list__item-progress-container">
          <div
            className="task-list__item-progress"
            style={{ width: `${calculateProgress(task.subtasks)}%` }} // Dynamically set width based on progress
          ></div>
        </div>
        <div className="task-list__item-progress-text">
          {calculateProgress(task.subtasks)}% Completed
        </div>
        <div className="task-list__item-buttons">
    <button
      className="task-list__item-edit-btn task-list__item-edit-btn--edit"
      onClick={() => openEditModal(task)}
    >
      Edit
    </button>
    <button
      className="task-list__item-delete-btn"
      onClick={() => removeTask(task.id)}
    >
      Remove
    </button>
  </div>
          </div>
        ))
      ) : (
        <p className="task-list__empty">No tasks available</p>
      )}
    </div>
  );
  
};

export default TaskList;



