import React, { useState } from 'react';
import '../utils/Task.css'; // Assuming this is where the styles are located

const TaskList = ({ tasks, removeTask, updateTaskProgress, editTask }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const openEditModal = (task) => {
    console.log('Editing task: ', task);
    editTask(task);
  };

  const calculateProgress = (subtasks) => {
    if (!subtasks || subtasks.length === 0) return 0;
    const completed = subtasks.filter((subtask) => subtask.status === 'completed').length;
    return Math.round((completed / subtasks.length) * 100);
  };

  const toggleSubtasks = (taskId) => {
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
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
                style={{ width: `${calculateProgress(task.subtasks)}%` }}
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

            {/* Subtask dropdown */}
            <div>
              <button
                className="task-list__item-toggle-btn"
                onClick={() => toggleSubtasks(task.id)}
              >
                {expandedTaskId === task.id ? 'Hide Subtasks' : 'Show Subtasks'}
              </button>

              {/* Render subtasks if expanded */}
              {expandedTaskId === task.id && (
                <ul className="task-list__subtasks">
                  {task.subtasks.map((subtask) => (
                    <li key={subtask.id} className="task-list__subtask-item">
                      <input
                        type="checkbox"
                        checked={subtask.status === 'completed'}
                        onChange={() => updateTaskProgress(task.id, subtask.id)}
                      />
                      <span>{subtask.name}</span>
                    </li>
                  ))}
                </ul>
              )}
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




