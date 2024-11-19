import React from 'react';

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
   <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.name}  
        <button onClick={() => removeTask(task.id)}>Delete</button>
        <button onClick={() => editTask(task.id, getNewText())}>Edit</button>{/* This button removes the task */} 

        </li>      
      ))}
    </ul>    
  );
};

export default TaskList;