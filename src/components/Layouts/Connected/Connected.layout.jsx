import './Connected.layout.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import Toolbar from '../../Sections/Toolbar/Toolbar';

const ConnectedLayout = () => (
  <Grid container>
    <Grid item xs={0} sm={3} lg={2} display={{ xs: 'none', sm: 'block' }}>
      <Toolbar />
    </Grid>
    <Grid item xs={12} sm={9} lg={10}>
      <Outlet />
    </Grid>
  </Grid>
);

export default ConnectedLayout;
