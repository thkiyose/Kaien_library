import React, { useState, useEffect, useCallback, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Index } from './components/Index';
import { BookDetail } from './components/BookDetail';
import { MyPage } from './components/MyPage';
import { MyPageLendings } from './components/MyPageLendings';
import { MyPageLendingHistory } from './components/MyPageLendingHistory';
import { MyPageReviews } from './components/MyPageReviews';
import { AdminMenu } from './components/admin/AdminMenu';
import { AdminData } from './components/admin/AdminData';
import { AdminBookIndex } from './components/admin/AdminBookIndex';
import { AdminUserIndex } from './components/admin/AdminUserIndex';
import { AdminLendingsIndex } from './components/admin/AdminLendingsIndex';
import { AdminReservationsIndex } from './components/admin/AdminReservationsIndex';
import { AdminReviewsIndex } from './components/admin/AdminReviewsIndex';
import { AdminCategoriesIndex } from './components/admin/AdminCategoriesIndex';
import { RegisterBook } from './components/admin/RegisterBook';
import { ImportResult } from './components/admin/ImportResult';
import { ImportComplete } from './components/admin/ImportComplete';
import { Lending } from './components/Lending';
import { Reservation } from './components/Reservation';
import { ReservationToLending } from './components/ReservationToLending';
import { Return } from './components/Return';
import { ThankYouForReturn } from './components/ThankYouForReturn';
import { ThankYouForLending } from './components/ThankYouForLending';
import { ReservationCreated } from './components/ReservationCreated';
import { getCurrentUser } from './lib/api/session';
import { fetchCategories } from './lib/api/book';
import { fetchLocations } from './lib/api/book';
export const Context = createContext();

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleGetCurrentUser = useCallback(async () => {
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
  },[]);
  useEffect(() => {
    handleGetCurrentUser();
    handleFetchCategories();
    handleFetchLocations();
  }, [setCurrentUser, handleGetCurrentUser]);

  const handleFetchCategories= async() => {
    const res = await fetchCategories();
    setCategories(res.data.category);
  }

  const handleFetchLocations= async() => {
    const res = await fetchLocations();
    setLocations(res.data.location);
  }

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
        return <Navigate to="/books" />;
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
        return <Navigate to="/books" />;
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
           setCategories,
           locations,
           setLocations
         }}
       >
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>} >
            <Route path={"/"} element={<NotLoggedInRoute><Login /></NotLoggedInRoute>} />
            <Route path={"/signup"} element={<NotLoggedInRoute><SignUp /></NotLoggedInRoute>} />
            <Route path={"/mypage"} element={<LoggedInRoute currentUser={currentUser}><MyPage /></LoggedInRoute>} >
              <Route path={"lendings"} element={<MyPageLendings />} />
              <Route path={"history"} element={<MyPageLendingHistory />} />
              <Route path={"reviews"} element={<MyPageReviews />} />
            </Route>
            <Route path={"/books"} element={<LoggedInRoute currentUser={currentUser}><Index /></LoggedInRoute>} />
            <Route path={"/books/:id"} element={<LoggedInRoute currentUser={currentUser}><BookDetail /></LoggedInRoute>} />
            <Route path={"/books/:id/lending"} element={<LoggedInRoute currentUser={currentUser}><Lending /></LoggedInRoute>} />
            <Route path={"/books/:id/reservation"} element={<LoggedInRoute currentUser={currentUser}><Reservation /></LoggedInRoute>} />
            <Route path={"/reservationlending/:id"} element={<LoggedInRoute currentUser={currentUser}><ReservationToLending /></LoggedInRoute>} />
            <Route path={"/thankyouforlending"} element={<LoggedInRoute currentUser={currentUser}><ThankYouForLending /></LoggedInRoute>} />
            <Route path={"/reservationcomplete"} element={<LoggedInRoute currentUser={currentUser}><ReservationCreated /></LoggedInRoute>} />
            <Route path={"/return/:id"} element={<LoggedInRoute currentUser={currentUser}><Return /></LoggedInRoute>} />
            <Route path={"/thankyouforreturn"} element={<LoggedInRoute currentUser={currentUser}><ThankYouForReturn /></LoggedInRoute>} />
            <Route path={"/admin"} element={<AdminProtectedRoute><AdminMenu /></AdminProtectedRoute>} />
            <Route path={"/admin/data_edit"} element={<AdminProtectedRoute><AdminData /></AdminProtectedRoute>} >
              <Route path={"books"} element={<AdminProtectedRoute><AdminBookIndex /></AdminProtectedRoute>} />
              <Route path={"users"} element={<AdminProtectedRoute><AdminUserIndex /></AdminProtectedRoute>} />
              <Route path={"lendings"} element={<AdminProtectedRoute><AdminLendingsIndex /></AdminProtectedRoute>} />
              <Route path={"reservations"} element={<AdminProtectedRoute><AdminReservationsIndex /></AdminProtectedRoute>} />
              <Route path={"reviews"} element={<AdminProtectedRoute><AdminReviewsIndex /></AdminProtectedRoute>} />
              <Route path={"categories"} element={<AdminProtectedRoute><AdminCategoriesIndex /></AdminProtectedRoute>} />
            </Route>
            <Route path={"/admin/book_registration"} element={<AdminProtectedRoute><RegisterBook /></AdminProtectedRoute>} />
            <Route path={"/admin/book_registration/result"} element={<AdminProtectedRoute><ImportResult /></AdminProtectedRoute>} />
            <Route path={"/admin/book_registration/complete"} element={<AdminProtectedRoute><ImportComplete /></AdminProtectedRoute>} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};
