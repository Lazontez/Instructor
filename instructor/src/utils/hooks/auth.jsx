import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

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

  return { isAuthenticated, userRole };
};


