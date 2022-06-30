import React, { useContext } from 'react'
import styled from "styled-components";
import { Context } from '../../App';
import { LogOut } from '../Logout';

const HeaderDiv = styled.div`
  background-color:rgb(236, 236, 236);
  height: 60px;
  position: fixed;
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
const HeaderLink = styled.a`
  display: inline;
`

const HeaderNavLeft = styled.ul`
  display:flex;
  float :left;
  margin: 0;
  li {
    line-height:60px;
    padding: 0px 10px;
  }
`
const HeaderNavRight = styled.ul`
  display:flex;
  float :right;
  margin: 0;
  li {
    line-height:60px;
    padding: 0px 10px;
  }
`

const Logo = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`

export const Header = () => {
  const {currentUser, setCurrentUser, isSignedIn, setIsSignedIn } = useContext(Context);

  return (
    <>
    <HeaderDiv>
      <HeaderNavLeft>
        <li><Logo>Library</Logo></li>
        {isSignedIn && <li><HeaderLink href="/books">書籍を探す</HeaderLink></li> }
        {isSignedIn && currentUser.admin ? <li><HeaderLink href="/admin">管理画面</HeaderLink></li> : "" }
      </HeaderNavLeft>
      <HeaderNavRight>
        {isSignedIn && <li><HeaderLink href="/mypage">ログイン中:{currentUser.email}</HeaderLink></li>}
        {isSignedIn && <li><LogOut setCurrentUser={setCurrentUser} setIsSignedIn={setIsSignedIn} /></li>}
      </HeaderNavRight>
    </HeaderDiv>
    </>
  )
};
