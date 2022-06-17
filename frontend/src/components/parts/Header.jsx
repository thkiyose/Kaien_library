import React, { useContext } from 'react'
import { AuthContext } from '../../App';
import { LogOut } from '../Logout';

export const Header = () => {
  const {currentUser, setCurrentUser, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const style = {
    width:"100%",
    backgroundColor:"rgb(249, 254, 207)",
    height:"50px",
    position:"fixed",
    top:"0",
    left:"0"
  };
  const styleLoginDisplay = {
    display:"inline",
    lineHeight:"50px",
    marginLeft:"50px"
  }
  return (
    <>
    <div style={style}>
      {isSignedIn && <p style={styleLoginDisplay}>ログイン中:{currentUser.email}</p>}
      {isSignedIn && <LogOut setCurrentUser={setCurrentUser} setIsSignedIn={setIsSignedIn} />}
    </div>
    </>
  )
};
