import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../utils/LogForm.css';

const LogForm = ({ addTask, taskCount }) => {
  const [taskText, setTaskText] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Music Theory');
  const [showForm, setShowForm] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    console.log("LogForm: Current task count is", taskCount);
  }, [taskCount]);

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
    if (taskCount < 3) {
      setShowForm(!showForm);
    }
  };

  return (
    <>
      <div className="log-form__toggle-container">
        <button
          className="log-form__toggle-btn"
          onClick={toggleForm}
          disabled={taskCount >= 3}
          title={taskCount >= 3 ? 'Only 3 tasks can be added at a time' : ''}
        >
          {taskCount >= 3
            ? `Beta: Max tasks reached (${taskCount}/3. Delete a task to retry)`
            : showForm
            ? 'Cancel'
            : `Add New Task (${taskCount}/3)`}
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
