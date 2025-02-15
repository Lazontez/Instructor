import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../utils/LogForm.css';

const LogForm = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Music Theory');
  const [showForm, setShowForm] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddingTask(true);
    if (taskText.trim()) {
      await addTask({
        id: Date.now(),
        name: taskText,
        description,
        category,
        status: 'in-progress',
        progress: 0,
        subtasks: [],
      });
      setTaskText('');
      setDescription('');
      setCategory('Music Theory');
      setIsAddingTask(false);
      setShowForm(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {/* Center the toggle button */}
      <div className="log-form__toggle-container">
        <button className="log-form__toggle-btn" onClick={toggleForm}>
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showForm &&
        ReactDOM.createPortal(
          <div
            className="log-form__backdrop"
            onClick={() => setShowForm(false)}
          >
            <div
              className="log-form__container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="log-form__close-btn"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
              <form className="log-form" onSubmit={handleSubmit}>
                <h2 className="log-form__title">Add a New Task</h2>

                <input
                  className="log-form__input"
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  placeholder="Task Name"
                  maxLength={50}
                  required
                />

                <textarea
                  className="log-form__textarea"
                  placeholder="Task Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <select
                  className="log-form__dropdown"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Music Theory">Music Theory</option>
                  <option value="Songs">Songs</option>
                  <option value="Technique">Technique</option>
                </select>

                <button className="log-form__submit-btn" type="submit">
                  {isAddingTask ? 'Adding Task....' : 'Add Task'}
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default LogForm;

