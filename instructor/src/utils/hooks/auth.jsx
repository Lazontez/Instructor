import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, setIsAuthenticated, userRole, setUserRole, loading };
};



