import React from 'react';
import '../utils/Task.css'; // Import the CSS for styling

const TaskList = ({ tasks , removeTask, editTask }) => {

  function getNewText(){
    const newText = window.prompt('What would you like to update the task name to?')
    if (newText){
      return newText
    }
    else{
      return 'No Task Name Entered. Press Edit To Update '
    }
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <span className="task-item__text">{task.name}</span>
          <button
            className="task-item__button task-item__button--edit"
            onClick={() => editTask(task.id, getNewText())}
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