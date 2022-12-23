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


export default function ButtonAppBar() {


    const navigate = useNavigate();

    const handleClick = (page) => {
        if (page === 'HOME') {
            navigate('/home');
        }
    }

    const pages = ['HOME', 'CONTRACT', 'PROFILE', 'TRANSFER']

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
                            onClick={handleClick(page)}
                            key={page}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>


                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}





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