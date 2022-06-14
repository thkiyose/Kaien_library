import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { getCurrentUser } from './lib/api/session';

export const AuthContext = createContext();

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
  try {
    const res = await getCurrentUser();
    console.log(res)
    if (res?.data.isLogin === true) {
      setIsSignedIn(true);
      setCurrentUser(res?.data.data);
      console.log(res?.data.data);
    } else {
      console.log('no current user');
    }
  } catch (e) {
    console.log(e);
  }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider
         value={{
           loading,
           setLoading,
           isSignedIn,
           setIsSignedIn,
           currentUser,
           setCurrentUser,
         }}
       >
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Login />} />
          <Route exact path={"/signup"} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
