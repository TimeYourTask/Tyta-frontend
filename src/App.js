import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Init</h1>} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
