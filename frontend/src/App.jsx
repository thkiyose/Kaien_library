import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login'
import { SignUp } from './components/SignUp'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<Login />} />
        <Route exact path={"/signup"} element={<SignUp />} />
      </Routes>
     </BrowserRouter>
  );
};
