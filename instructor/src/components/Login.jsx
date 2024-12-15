import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../utils/Login.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Fix import
import { useAuth } from '../utils/hooks/auth.jsx';

// MUI imports
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1db954',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {isAuthenticated, userRole, setIsAuthenticated, setUserRole } = useAuth();
  const navigate = useNavigate();

  const onLogin = async () => {
    const data = { email, password };
  
    try {
      const res = await axios.post('https://instructor-server.onrender.com/api/user/login', data);
  
      if (res.status === 200 && res.data.token) {
        const token = res.data.token;
        const decodedToken = jwtDecode(token);
  
        localStorage.setItem('token', token);
        localStorage.setItem('role', decodedToken.role);
  
        if (
          localStorage.getItem('token') === token &&
          localStorage.getItem('role') === decodedToken.role
        ) {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Invalid email or password. Please try again.');
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>

          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ marginTop: 2 }}
              className="error"
            >
              {error}
            </Typography>
          )}

          <Typography align="center" sx={{ marginTop: 2 }}>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;



