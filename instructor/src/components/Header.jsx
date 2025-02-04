import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import logo from '../assets/logos/pro-guitar-instructor-logo.png'
import '../utils/Header.css'


const Header = () => {

    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')

    }
    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: '#f4f4f9',
                boxShadow: 'none',
                color: 'black',  
            }}
        >
            {/* Container creates horizontal space like modern navbars */}
            <Container maxWidth="lg">
                {/* disableGutters removes Toolbar's default left/right padding */}
                <Toolbar disableGutters sx={{ minHeight: '50px' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <img
                            src={logo}
                            alt="Guitar Instructor Pro Logo"
                            style={{ height: '60px', marginRight: '16px' }}
                        />
                    </Box>
                    <Button
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            padding: '6px 12px',
                        }}
                        onClick={() => handleLogOut}
                        id='logOutBtn'
                    >
                        Logout
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;



