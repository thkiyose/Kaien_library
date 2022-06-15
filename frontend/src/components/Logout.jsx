import React from 'react';
import { signOut } from '../lib/api/session';
import { useNavigate } from 'react-router-dom';

export const LogOut = (props) => {
  const { setCurrentUser, setIsSignedIn } = props;
  const navigate = useNavigate();

  const handleLogOut = async() => {
    try {
      await signOut();
      setCurrentUser("");
      setIsSignedIn(false);
      navigate("/");
    } catch(e) {
      console.log(e);
    }
  };
  return <button onClick={handleLogOut}>ログアウト</button>
};
