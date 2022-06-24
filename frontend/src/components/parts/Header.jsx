import React, { useContext } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Context } from '../../App';
import { LogOut } from '../Logout';

const HeaderDiv = styled.div`
  background-color:#e6fff1;
  height: 50px;
  top: 0;
  left: 0;
  width:100%;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  a {
    text-decoration: none;
  }
  ul {
    list-style :none;
  }
`

export const Header = () => {
  const {currentUser, setCurrentUser, isSignedIn, setIsSignedIn } = useContext(Context);
  const style = {
    width:"100%",
    backgroundColor:"#e6fff1",
    height:"50px",
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
    <HeaderDiv>
      {isSignedIn && <Link to="/mypage" style={styleLoginDisplay}>ログイン中:{currentUser.email}</Link>}
      {isSignedIn && currentUser.admin ? <Link to="/admin">管理画面</Link> : "" }
      {isSignedIn && <LogOut setCurrentUser={setCurrentUser} setIsSignedIn={setIsSignedIn} />}
    </HeaderDiv>
    </>
  )
};
