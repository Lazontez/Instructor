import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskLists/'; 
import LogForm from '../components/LogForm.jsx'; 
import '../utils/StudentDashboard.css'; 
import apiTask from '../utils/api/tasks.js';
import { jwtDecode } from 'jwt-decode';

const StudentDashboard = () => {
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token); 
      const userId = decodedToken.id;
      
      try {
        const userTasks = await apiTask.getTasks(userId , token); 
        setTasks(userTasks); 
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <div className="student-dashboard">
      <header className="student-dashboard__header">
        <h1 className="student-dashboard__title">Student Dashboard</h1>
      </header>

      <div className="student-dashboard__content">
        <div className="student-dashboard__task-list">
          <h2 className="student-dashboard__section-title">Your Tasks</h2>
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>

        <div className="student-dashboard__log-form">
          <h2 className="student-dashboard__section-title">Log a New Task</h2>
          <LogForm addTask={addTask} />
        </div>
      </div>

      <div className="student-dashboard__placeholder">
        {/* Future Changes Here! */}
      </div>
    </div>
  );
};

export default StudentDashboard;
