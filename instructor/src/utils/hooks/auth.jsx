import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(decodedToken.role);
        } else {
          // Token expired, clear localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          setIsAuthenticated(false);
          navigate('/login')
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
        navigate('/login')
      }
      
    }
    setLoading(false);
  }, []);

  return { isAuthenticated, setIsAuthenticated, userRole, setUserRole, loading };
};



