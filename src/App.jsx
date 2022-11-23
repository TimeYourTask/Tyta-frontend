import './App.scss';

import React from 'react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import Header from './components/Sections/Header/Header';
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
      <Header />
      <Router />
      {/* <Footer /> */}
    </ThemeProvider>
  );
};

export default App;
