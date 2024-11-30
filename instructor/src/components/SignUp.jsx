import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../utils/Login.css';  // Keep your custom styles if needed
import axios from 'axios';

// MUI imports
import { TextField, Button, Container, Typography, Box, ThemeProvider, createTheme } from '@mui/material';

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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // To store the error message
  const navigate = useNavigate();

  const onSignUp = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const data = {
      email: email,
      password: password,
      username: username
    };

    axios
      .post('http://localhost:5000/api/user/n', data)
      .then((res) => {
        console.log(data)
        if (res.status === 200 && res.data['New User']) {
          navigate('/login');
        }else{
            setError('An unexpected error occurred.')
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            setError('Invalid email or password. Please try again.');
          } else if (err.response.status === 409) {
            setError('Email already exists. Please use a different email.');
          } else {
            setError('Something went wrong. Please try again later.');
          }
        } else if (err.message === 'Network Error') {
          setError('Unable to connect to the server. Check your internet connection.');
        } else {
          setError('An unexpected error occurred.');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>

          <form onSubmit={handleSubmit}>
          <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign Up
            </Button>
          </form>
          {error && <p className="error">{error}</p>}

          <Typography align="center" sx={{ marginTop: 2 }}>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
