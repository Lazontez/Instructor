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

  return (
    <div>
      <h1>Guitar Lesson Tracker</h1>
      <LogForm addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;