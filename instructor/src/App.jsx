import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
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

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router basename="/">
      <div className="app">
        <Routes>
          {/* Login and Sign Up Routes */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;




