import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../lib/api/session';

export const LogOut = (props) => {
  const { setCurrentUser } = props;
  const navigate = useNavigate();

  const handleLogOut = async() => {
    try {
      const res = await signOut();
      console.log(res);
      setCurrentUser("");
    } catch(e) {
      console.log(e);
    }
  };
  return <button onClick={handleLogOut}>ログアウト</button>
};
