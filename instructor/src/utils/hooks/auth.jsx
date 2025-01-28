import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 > Date.now(); 
      } catch {
        return false;
      }
    }
    return false;
  });

  const [userRole, setUserRole] = useState(() => localStorage.getItem('role') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(role);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); 
  }, []);

  return { isAuthenticated, setIsAuthenticated, userRole, setUserRole, loading };
};






