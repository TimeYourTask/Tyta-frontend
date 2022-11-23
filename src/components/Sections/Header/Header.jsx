import './Header.scss';

import React from 'react';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        component="h1"
        sx={{ flexGrow: 1, cursor: 'pointer' }}
      >
        <Link to="/">TimeYourTask</Link>
      </Typography>

      <Link to="/login">
        <Button color="inherit">Login</Button>
      </Link>
    </Toolbar>
  </AppBar>
);

export default Header;
