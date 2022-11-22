import './App.scss';

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';

import Header from './components/Header/Header';

function App() {
  const { message } = useSelector((state) => state.init);

  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<h1>{message}</h1>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
