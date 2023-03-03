import * as React from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { List, Toolbar, Typography, Divider, Badge, Button , Avatar, CssBaseline, Box, Menu, MenuItem, Tooltip, InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ListItemIcon from '@mui/material/ListItemIcon';

import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import ContentFile from '../Routes/ContentFile';
import {  useState } from "react";
import { Dashboard } from '@mui/icons-material';

const drawerWidth = 240;






const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const mdTheme = createTheme();

export default function MainHead() {
    const [title , setTitle] = useState("dashboard");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openi = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = React.useState(false);
 
    const handleLogout = () => {

        sessionStorage.clear();
        localStorage.clear();
        navigate('Sign')
            

    }
 
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={mdTheme}>
            <Box className='d-flex'>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar sx={{bgcolor: '#53B175'}}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                           Dashboard
                        </Typography>
                        
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>V</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openi}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                         
                            <MenuItem>
                                <IconButton size='small' onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </IconButton>

                            </MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
                
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    
                    <ContentFile/>
                </Box>
            </Box>
        </ThemeProvider >
    );
}





