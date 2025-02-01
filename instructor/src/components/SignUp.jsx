import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../utils/Login.css';  // Keep your custom styles if needed
import axios from 'axios';

// MUI imports
import { TextField, Button, Container, Typography, Box, ThemeProvider, createTheme, FormControl, Select, InputLabel, MenuItem } from '@mui/material';

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
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSignUp = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const data = {
      email: email.toLowerCase(),
      password,
      username,
      skillLevel,
      role
    };

    axios
      .post('https://instructor-server.onrender.com/api/user/n', data)
      .then((res) => {
        if (res.status === 200 && res.data['New User']) {
          navigate('/login');
        } else {
          setError('An unexpected error occurred.');
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

            {/* Skill Level & Role Dropdowns - Side by Side */}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Skill Level</InputLabel>
                <Select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  required
                >
                  <MenuItem value="Beginner">Beginner - Just starting out</MenuItem>
                  <MenuItem value="Intermediate">Intermediate - Comfortable with chords & basic songs</MenuItem>
                  <MenuItem value="Advanced">Advanced - Confident with solos & techniques</MenuItem>
                  <MenuItem value="Expert">Expert - Professional or highly skilled player</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <MenuItem value="Student">Student - Learning & tracking progress</MenuItem>
                  {/* <MenuItem value="Teacher">Teacher - Managing student goals</MenuItem>
                  <MenuItem value="Parent">Parent - Overseeing child's practice</MenuItem> */}
                </Select>
              </FormControl>
            </Box>

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
