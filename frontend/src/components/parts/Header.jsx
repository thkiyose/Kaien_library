import React, { useContext } from 'react'
import styled from "styled-components";
import { Context } from '../../App';
import { LogOut } from '../Logout';
import Color from './Color';

const HeaderDiv = styled.div`
  background-color: ${Color.secondary};
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.1);
  a {
    text-decoration: none;
  }
  ul {
    list-style :none;
  }
`
const HeaderLink = styled.a`
  display: block;
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
  li a {
    display:inline-flex;
    align-items: center;
  }
`
const Icon  = styled.img`
  height: 30px;
  display: inline;
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
        {isSignedIn && <li><HeaderLink href="/mypage/lendings"><Icon src={`${process.env.PUBLIC_URL}/user.png`} />ログイン中:{currentUser.email}</HeaderLink></li>}
        {isSignedIn && <li><LogOut setCurrentUser={setCurrentUser} setIsSignedIn={setIsSignedIn} /></li>}
      </HeaderNavRight>
    </HeaderDiv>
    </>
  )
};
