import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Header = () => {

    const navigate = useNavigate()

    const handleLogOut = ()=>{
        console.log('Logging Out User')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')

    }
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: 'none',
        paddingX: 2, // Adds some spacing on the left and right
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left side - You can add a logo/title here */}
          <Box sx={{ flexGrow: 1 }}> {/* Placeholder for a title or logo */} </Box>

          {/* Right side - Logout Button */}
          <Button
            color="inherit"
            sx={{
              padding: '6px 12px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
            }}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;



