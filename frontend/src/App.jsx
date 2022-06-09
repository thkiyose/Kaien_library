import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<Login />} />
      </Routes>
     </BrowserRouter>
  );
};
