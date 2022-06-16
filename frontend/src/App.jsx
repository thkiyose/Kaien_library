import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { MyPage } from './components/MyPage';
import { getCurrentUser } from './lib/api/session';

export const AuthContext = createContext();

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleGetCurrentUser = async () => {
  try {
    const res = await getCurrentUser();
    if (res?.data.isLogin === true) {
      setIsSignedIn(true);
      setCurrentUser(res?.data.data);
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

  const LoggedInRoute = ( {children} ) => {
    if (!loading) {
      if (isSignedIn) {
        return children ;
      } else {
        return <Navigate  to='/' />;
      }
    } else {
      return <></>;
    }
  };

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
          <Route path={"/"} element={<Login />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route
            path={"/users"}
            element={
              <LoggedInRoute currentUser={currentUser}>
                <MyPage />
              </LoggedInRoute>
            }
            >
            <Route path={":userId"} element={<MyPage />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
