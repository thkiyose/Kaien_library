import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { MyPage } from './components/MyPage';
import { AdminMenu } from './components/AdminMenu';
import { AdminBookIndex } from './components/AdminBookIndex';
import { RegisterBook } from './components/RegisterBook';
import { getCurrentUser } from './lib/api/session';
import { fetchCategories } from './lib/api/book';
import { fetchLocations } from './lib/api/book';
import { fetchBooks } from './lib/api/book';

export const Context = createContext();

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [books, setBooks] = useState([]);

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

  const handleFetchCategories= async() => {
    const res = await fetchCategories();
    setCategories(res.data.category);
  }

  const handleFetchLocations= async() => {
    const res = await fetchLocations();
    setLocations(res.data.location);
  }

  const handleFetchBooks= async() => {
    const res = await fetchBooks();
    setBooks(res.data);
  }

  useEffect(() => { handleFetchCategories() }, []);
  useEffect(() => { handleFetchLocations() }, []);
  useEffect(() => { handleFetchBooks() }, []);

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

  const NotLoggedInRoute = ( {children} ) => {
    if (!loading) {
      if (!isSignedIn) {
        return children ;
      } else {
        return <Navigate to="/mypage" />;
      }
    } else {
      return <></>;
    }
  };

  const AdminProtectedRoute = ( {children} ) => {
    if (!loading) {
      if (isSignedIn && currentUser.admin === true) {
        return children ;
      } else {
        return <Navigate to="/mypage" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <Context.Provider
         value={{
           loading,
           setLoading,
           isSignedIn,
           setIsSignedIn,
           currentUser,
           setCurrentUser,
           categories,
           locations,
           books
         }}
       >
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>} >
            <Route path={"/"} element={<NotLoggedInRoute><Login /></NotLoggedInRoute>} />
            <Route path={"/signup"} element={<NotLoggedInRoute><SignUp /></NotLoggedInRoute>} />
            <Route path={"/mypage"} element={<LoggedInRoute currentUser={currentUser}><MyPage /></LoggedInRoute>} />
            <Route path={"/admin"} element={<AdminProtectedRoute><AdminMenu /></AdminProtectedRoute>} />
            <Route path={"/admin/books/index"} element={<AdminProtectedRoute><AdminBookIndex /></AdminProtectedRoute>} />
            <Route path={"/admin/book_registration"} element={<AdminProtectedRoute><RegisterBook /></AdminProtectedRoute>} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};
