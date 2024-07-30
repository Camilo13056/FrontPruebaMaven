import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from '../src/components/Registro';
import Login from '../src/components/Login';
import CrudUsers from '../src/components/CrudUsers';
import EditUser from '../src/components/EditUser';
import TaskAssign from './components/TaskAssign';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<CrudUsers />} />
        <Route path="/edit-user/:id" element={<EditUser/>} />
        <Route path="/tasks" element={<TaskAssign/>} />

      </Routes>
    </Router>
  );
}

export default App;
