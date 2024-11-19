import React, { useState } from 'react';
import LogForm from './components/LogForm.jsx';
import TaskList from './components/TaskLists.jsx';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]); // Add the new task to the existing array
  };

  // Remove a task from the list
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  function editTask(taskId, newTaskText) {
    setTasks(tasks.map((task) => {
      // If task.id matches taskId, update the task
      if (task.id === taskId) {
        return { ...task, name: newTaskText }; // Return updated        
      }
      // If task.id doesn't match taskId, return the task as is
      return task;
    }));
  }

  return (
    <div>
      <h1>Task Tracker</h1>
      <LogForm addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} editTask={editTask} />
    </div>
  );
}

export default App;
