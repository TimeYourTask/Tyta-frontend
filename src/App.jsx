import './App.scss';

import React from 'react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import Router from './Router';

import lightTheme from './themes/light';

const App = () => {
  const [mode] = React.useState('light');

  const theme = React.useMemo(
    () => createTheme(mode === 'light' ? lightTheme : lightTheme),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
