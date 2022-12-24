import './Connected.layout.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, CssBaseline, Drawer, IconButton, Toolbar as MuiToolBar } from '@mui/material';
import { KeyboardArrowRight as OpenIcon } from '@mui/icons-material';

import Header from '../../Sections/Header/Header';
import Toolbar from '../../Sections/Toolbar/Toolbar';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    position: 'relative',
    flexGrow: 1,
    padding: theme.spacing(5),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const ConnectedLayout = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} />
      <Box sx={{ height: '100vh' }}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <MuiToolBar />
          <Box sx={{ overflow: 'auto', height: '100%' }}>
            <Toolbar />
          </Box>
        </Drawer>
      </Box>
      <Main open={open}>
        <IconButton
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          size="large"
          sx={{
            border: 'solid rgba(0, 0, 0, 0.12)',
            borderWidth: '1px 1px 1px 0',
            borderRadius: '0 4px 4px 0',
            position: 'absolute',
            padding: '4px',
            top: 3,
            left: 0,
            opacity: 100,
          }}
        >
          <OpenIcon sx={{ transform: open && 'rotate(180deg)' }} />
        </IconButton>
        <Outlet />
      </Main>
    </Box>
  );
};

export default ConnectedLayout;
