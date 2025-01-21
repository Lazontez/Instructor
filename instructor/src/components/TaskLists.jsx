import React, { useState } from 'react';
import TaskModal from '../components/TaskEditModal';
import '../utils/Task.css'
import apiTask from '../utils/api/tasks.js'
import SubTaskToolTip from '../components/SubTaskToolTip.jsx'
const TaskList = ({ tasks, setTasks }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);


  const removeTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token')
      await apiTask.removeTask(taskId, token);
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  // Function to open the edit modal
  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true); // Open the modal to edit the task
  };

  // Function to save an edited task
  const saveTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    closeModal();
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
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
                className="task-list__item-edit-btn"
                onClick={() => openEditModal(task)}
              >
                Edit
              </button>

              <button
                className="task-list__item-delete-btn"
                onClick={() => removeTask(task._id)}
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
              {expandedTaskId === task.id && (
                <ul className="task-list__subtasks">
                  {(task.status === 'completed'?
                  <div className='task-completed-msg'>Task completed at the time this goal was created—off to a strong start!</div>
                :task.subtasks.map((subtask, index) => (
                      <li key={index} className="task-list__subtask-item">
                        <input
                          type="checkbox"
                          checked={subtask.status === 'completed'}
                        />
                        <span>{subtask.name}</span>
                        <SubTaskToolTip description={subtask.description} handsOnTask={subtask.task}/>
                      </li>
                    ))
                )}
                </ul>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="task-list__empty">No tasks available</p>
      )}

      {/* Modal for editing tasks */}
      {isModalOpen && (
        <TaskModal
          task={currentTask}
          onSave={saveTask}
          onClose={closeModal}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default TaskList;










