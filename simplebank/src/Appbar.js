import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';



const ButtonAppBar = (props) => {
    const navigate = useNavigate();

    const handleClick = (page) => {
        console.log(page);
        if (page === 'HOME') {
            navigate('/home');
        } else if (page == 'PROFILE') {
            navigate('/profile');
        } else if (page == 'TRANSACTION') {
            navigate('/transactions')
        } else if (page == 'CONTACT') {
            navigate('/contacts')
        } else if (page == 'DEBT') {
            navigate('/debts')
        }
    }

    const { role } = props

    const pages = (role == 'Admin' || role == 'Employee') ? [''] : ['HOME', 'CONTACT', 'TRANSACTION', 'DEBT']

    const logOut = () => {
        navigate('/')
    }

    return (
        <AppBar position="absolute" open={true}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >

                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            onClick={() => handleClick(page)}
                            key={page}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>


                <IconButton color="inherit" onClick={logOut}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}


export default ButtonAppBar





// <IconButton
//     edge="start"
//     color="inherit"
//     aria-label="open drawer"
//     onClick={toggleDrawer}
//     sx={{
//         marginRight: '36px',
//         ...(open && { display: 'none' }),
//     }}
// >
//     <MenuIcon />
// </IconButton>