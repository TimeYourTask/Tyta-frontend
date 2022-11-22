import './App.scss';

import React from 'react';

import Header from './components/Sections/Header/Header';
import Footer from './components/Sections/Footer/Footer';
import Router from './Router';

const App = () => (
  <>
    <Header />
    <Router />
    <Footer />
  </>
);

export default App;
