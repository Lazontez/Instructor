import React from 'react';

const TaskList = ({ tasks , removeTask }) => {

    function SaveTask (){
        console.log(tasks)
    }

  return (
   <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.name}  
        <button onClick={() => removeTask(task.id)}>Delete</button> {/* This button removes the task */}      
        </li>      
      ))}
    </ul>    
  );
};

export default TaskList;