import './Header.scss';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { logout } from '../../../store/actions/auth';
import useNotification from '../../../hooks/useNotifications';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (target) => {
    setAnchorElNav(null);
    navigate(target);
  };

  const logOut = React.useCallback(() => {
    dispatch(logout());
    displayNotification({ message: 'You are now disconnected, see you soon!', type: 'success' });
    navigate('/');
  }, [dispatch, displayNotification, navigate]);

  const pages = [
    {
      key: 'login',
      label: 'Login',
      action: () => navigate('/login'),
      needLoggedIn: false,
    },
    {
      key: 'register',
      label: 'Create an account',
      action: () => navigate('/register'),
      needLoggedIn: false,
    },
    {
      key: 'logout',
      label: 'Logout',
      action: () => logOut(),
      needLoggedIn: true,
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, cursor: 'pointer' }}>
          <Link to={!currentUser ? '/' : '/overview'}>TimeYourTask</Link>
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            size="large"
            aria-label="Open navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.key} onClick={() => handleCloseNavMenu(page.target)}>
                <Typography textAlign="center">{page.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          {pages.map((page, key) => {
            if ((currentUser && !page.needLoggedIn) || (!currentUser && page.needLoggedIn)) {
              return false;
            }
            return (
              <Button
                key={page.key}
                onClick={page.action}
                color="white"
                sx={{
                  my: 2,
                  display: 'block',
                }}
                variant={pages.length - 1 === key ? 'outlined' : 'text'}
              >
                {page.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
