import React from 'react';
import { signOut } from '../lib/api/session';

export const LogOut = (props) => {
  const { setCurrentUser, setIsSignedIn } = props;

  const handleLogOut = async() => {
    try {
      await signOut();
      setCurrentUser("");
      setIsSignedIn(false);
    } catch(e) {
      console.log(e);
    }
  };
  return <button onClick={handleLogOut}>ログアウト</button>
};
