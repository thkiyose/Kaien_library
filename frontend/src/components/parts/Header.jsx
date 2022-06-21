import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
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
    left:"0",
  };
  const styleLoginDisplay = {
    display:"inline",
    lineHeight:"50px",
    marginLeft:"50px"
  }
  return (
    <>
    <div style={style}>
      {isSignedIn && <Link to="/mypage" style={styleLoginDisplay}>ログイン中:{currentUser.email}</Link>}
      {isSignedIn && currentUser.admin ? <Link to="/admin">管理画面</Link> : "" }
      {isSignedIn && <LogOut setCurrentUser={setCurrentUser} setIsSignedIn={setIsSignedIn} />}
    </div>
    </>
  )
};
