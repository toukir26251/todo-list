import React, { useState } from 'react';
import './App.css';
import Navbar from './components/common/Navbar';
import Taskform from './components/form/Taskform';
import { Todo } from './models/Todo';
import Todolist from './components/list/Todolist';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'Dark';
  })

  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') ?? 'Light';
  })

  const handleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    setTheme(newTheme ? 'Dark' : 'Light');
    console.log(theme);
    localStorage.setItem('theme', newTheme ? 'Dark' : 'Light');
  }

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route  element={<ProtectedRoute />}>
          <Route path='/' element={<Home darkTheme={darkTheme} setDarkTheme={setDarkTheme} handleTheme={handleTheme} />} />
          <Route path='/profile' element={<Profile darkTheme={darkTheme} setDarkTheme={setDarkTheme} handleTheme={handleTheme} />} />
        </Route>
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
