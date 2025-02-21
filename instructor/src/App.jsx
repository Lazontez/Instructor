import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import BrandPage from './pages/BrandPage.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<BrandPage />}></Route>
          <Route path="/dashboard" element={<RoleBasedDashboard />} />
          <Route path="*" element={<FallbackRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const RoleBasedDashboard = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
};

const FallbackRedirect = () => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default App;

