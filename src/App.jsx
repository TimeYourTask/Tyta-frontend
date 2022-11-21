import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';

function App() {
  const { message } = useSelector((state) => state.init);

  return (
    <Routes>
      <Route path="/" element={<h1>{message}</h1>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
