// StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskLists/'; 
import LogForm from '../components/LogForm.jsx'; 
import '../utils/StudentDashboard.css'; 
import apiTask from '../utils/api/tasks.js';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header.jsx';

const StudentDashboard = () => {
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token); 
      const userId = decodedToken.id;
      
      try {
        const userTasks = await apiTask.getTasks(userId, token); 
        setTasks(userTasks); 
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const token = localStorage.getItem('token');
    let newTask = await apiTask.addTask(task, token);
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <>
      <Header />
      <div className="student-dashboard">
        <header className="student-dashboard__header">
          <h1 className="student-dashboard__title">Student Dashboard</h1>
        </header>

        <div className="student-dashboard__content">
          <div className="student-dashboard__task-list">
            <h2 className="student-dashboard__section-title">Your Tasks</h2>
            {/* Moved LogForm here */}
            <LogForm addTask={addTask} />
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>
          {/* Removed the separate log form column */}
        </div>

        <div className="student-dashboard__placeholder">
          {/* Future Changes Here! */}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;

