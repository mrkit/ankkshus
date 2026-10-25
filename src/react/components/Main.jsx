import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Distillery from './pages/Distillery/Distillery';
import Home from './pages/Home';

const OpenLuci = () => {
  useEffect(() => { window.open('/luci'); }, []);
  return null;
};

const Main = () => (
  <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/distillery/*' element={<Distillery />} />
      <Route path='/luci' element={<OpenLuci />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </main>
);

export default Main;
