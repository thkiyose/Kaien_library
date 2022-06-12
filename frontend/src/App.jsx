import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';

export const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user,setUser] = useState({});
  const handleLogin = (data) => {
  setLoggedInStatus("ログイン中")
  setUser(data.user)
}
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<Login handleLogin={handleLogin} loggedInStatus={loggedInStatus} />} />
        <Route exact path={"/signup"} element={<SignUp handleLogin={handleLogin} />} />
      </Routes>
     </BrowserRouter>
  );
};
