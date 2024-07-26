import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from '../src/components/Registro';
import Login from '../src/components/Login';
import CrudUsers from './components/CrudUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<CrudUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
