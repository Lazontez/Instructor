import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx'; 
import SignUp from './components/SignUp.jsx'
import TeacherDashboard from './components/TeacherDashboard'; 
import StudentDashboard from './components/StudentDashboard'; 
import {jwtDecode} from 'jwt-decode';
import { useAuth } from './utils/hooks/auth.jsx';

function App() {
  const { isAuthenticated, setIsAuthenticated, userRole, setUserRole, loading } = useAuth();
  const [tasks, setTasks] = useState([
    // Example tasks data
    {
      id: 1,
      name: 'Practice scales',
      description: 'Practice major scales',
      status: 'in-progress',
      progress: 50,
      subtasks: [
        { id: 1, name: 'Open Chords', status: 'completed' },
        { id: 2, name: 'Barre Chords', status: 'in-progress' },
      ],
    },
    {
      id: 2,
      name: 'Learn chords',
      description: 'Learn basic chord progressions',
      status: 'in-progress',
      progress: 20,
      subtasks: [
        { id: 1, name: 'Open Chords', status: 'in-progress' },
        { id: 2, name: 'Barre Chords', status: 'in-progress' },
      ],
    },
  ]);

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
          setIsAuthenticated(true);
          setUserRole(decodedToken.role);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);
  console.log(loading)

  if (loading) {
    console.log("loading")
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <>
              <Route
                path="/dashboard"
                element={
                  userRole === 'teacher' ? (
                    <TeacherDashboard tasks={tasks} setTasks={setTasks} />
                  ) : (
                    <StudentDashboard tasks={tasks} setTasks={setTasks} />
                  )
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}

          {/* Catch-all for unrecognized routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



