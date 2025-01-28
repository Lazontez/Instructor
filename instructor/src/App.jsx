import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import { useAuth } from './utils/hooks/auth.jsx';

function App() {
  const { isAuthenticated, userRole, loading } = useAuth();

  const [tasks, setTasks] = useState([
    // Example tasks data
    {
      id: 1,
      name: 'Practice scales',
      description: 'Practice major scales',
      status: 'in-progress',
      progress: 75,
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
      progress: 60,
      subtasks: [
        { id: 1, name: 'Open Chords', status: 'completed' },
        { id: 2, name: 'Barre Chords', status: 'in-progress' },
        { id: 3, name: 'Practice Chord Changes', status: 'completed' },
      ],
    },
  ]);

  if (loading) {
    return <div>Loading...</div>; 
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isAuthenticated ? (
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
        ):(
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
  
}

export default App;




