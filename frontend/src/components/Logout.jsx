import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { signOut } from '../lib/api/session';

export const LogOut = () => {
  const handleLogOut = async() => {
    try {
      const res = await signOut();
    } catch(e) {
      console.log(e);
    }
  };
  return <button onClick={handleLogOut}>ログアウト</button>
};
