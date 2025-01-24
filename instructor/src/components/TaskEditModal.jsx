import React, { useState, useEffect } from 'react';
import '../utils/TaskEditModal.css'; // Importing the CSS for styling

const TaskEditModal = ({ isModalOpen, task, onClose, onSave }) => {
  const [taskText, setTaskText] = useState(task ? task.name : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [isCompleted, setIsCompleted] = useState(task ? task.status === 'completed' : false);

  useEffect(() => {
    // Reset fields when task is updated or modal is reopened
    if (task) {
      setTaskText(task.name);
      setDescription(task.description);
      setIsCompleted(task.status === 'completed');
    }
  }, [task, isModalOpen]);

  const handleTaskTextChange = (e) => {
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
    task.subtasks.forEach(item=>{
        item.status = 'completed'
    })
    setIsCompleted(!isCompleted);
  };

  const handleSave = (taskId) => {
    if (taskText.trim()) {
      onSave({
        ...task,
        name: taskText,
        description: description,
        status: isCompleted ? 'completed' : 'in-progress',
      });
      onClose(); // Close modal after saving
    }
  };

  if (!isModalOpen) return null; // Don't render if the modal is closed

  return (
    <div className="task-edit-modal">
      <div className="task-edit-modal__content">
        <h2 className="task-edit-modal__header">Edit Task</h2>

        {/* Task Name Input */}
        <input
          className="task-edit-modal__input"
          type="text"
          value={taskText}
          onChange={handleTaskTextChange}
          placeholder="Edit task name"
          maxLength={35}
        />

        {/* Task Description Textarea */}
        <textarea
          className="task-edit-modal__textarea"
          placeholder="Edit task description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>

        {/* Checkbox for Completed Status */}
        <label className="task-edit-modal__checkbox-label">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className="task-edit-modal__checkbox"
          />
          Mark as completed
        </label>

        {/* Buttons */}
        <div className="task-edit-modal__buttons">
          <button className="task-edit-modal__save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="task-edit-modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;






