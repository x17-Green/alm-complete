// src/components/Header.tsx

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { LogoutButton } from './LogoutButton'; // Adjust the import path as necessary
// import { useAuth } from '../../hooks/useAuth'; // Import the useAuth hook
// import { useAuth } from '../../context/AuthContext'; 


const Header: React.FC = () => {
  // const { isLoggedIn } = useAuth(); // Get the authentication state
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.name} component={RouterLink} to={item.path}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
        {/* Conditionally render LogoutButton if user is logged in */}
        {/* {isLoggedIn && (
          <ListItemButton>
            <ListItemText>
              <LogoutButton />
            </ListItemText>
          </ListItemButton>
        )} */}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Afro Lyrics Mania
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <nav>
            {navItems.map((item) => (
              <Button key={item.name} color="inherit" component={RouterLink} to={item.path}>
                {item.name}
              </Button>
            ))}
            {/* Conditionally render LogoutButton in the navigation for larger screens */}
            {/* {isLoggedIn && <LogoutButton />} */}
          </nav>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
