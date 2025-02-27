import React, { useState } from 'react';
import TaskModal from '../components/TaskEditModal';
import '../utils/Task.css';
import apiTask from '../utils/api/tasks.js';
import SubTaskToolTip from '../components/SubTaskToolTip.jsx';

const TaskList = ({ tasks, setTasks }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const removeTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await apiTask.removeTask(taskId, token);
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const saveTask = async (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task._id === updatedTask._id ? updatedTask : task
    );
    const token = localStorage.getItem('token');
    await apiTask.editTask(updatedTask._id, token, updatedTask);
    setTasks(updatedTasks);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const calculateProgress = (subtasks) => {
    if (!subtasks || subtasks.length === 0) return 100;
    const completed = subtasks.filter((subtask) => subtask.status === 'completed').length;
    return Math.round((completed / subtasks.length) * 100);
  };

  const toggleSubtasks = (taskId) => {
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  const handleChange = (task, subtask) => async (event) => {
    const updatedSubtask = { 
      ...subtask, 
      status: event.target.checked ? 'completed' : 'incomplete' 
    };

    const updatedTasks = tasks.map(t =>
      t._id === task._id
        ? { 
            ...t, 
            subtasks: t.subtasks.map(st => 
              st._id === subtask._id ? updatedSubtask : st
            ) 
          }
        : t
    );
    setTasks(updatedTasks);

    try {
      const token = localStorage.getItem('token');
      await apiTask.editTask(task._id, token, {
        subtasks: task.subtasks.map(st => 
          st._id === subtask._id ? updatedSubtask : st
        ),
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="task-list">
      <div className="task-list__header">
        <h3>Tasks: {tasks.length}/3</h3>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-list__item">
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
            <div>
              <button
                className="task-list__item-toggle-btn"
                onClick={() => toggleSubtasks(task._id)}
              >
                {expandedTaskId === task._id ? 'Hide Subtasks' : 'Show Subtasks'}
              </button>
              {expandedTaskId === task._id && (
                <ul className="task-list__subtasks">
                  {task.status === 'completed' ? (
                    <div className="task-completed-msg">
                      Goal Completed—good job, lets keep going!
                    </div>
                  ) : (
                    task.subtasks.map((subtask, index) => (
                      <li key={index} className="task-list__subtask-item">
                        <input
                          onChange={handleChange(task, subtask)}
                          type="checkbox"
                          checked={subtask.status === 'completed'}
                        />
                        <span>{subtask.name}</span>
                        <SubTaskToolTip description={subtask.description} handsOnTask={subtask.task} />
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











