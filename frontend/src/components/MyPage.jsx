import React, { useContext } from 'react'
import { AuthContext } from '../App';
import { Header } from './parts/Header';
import { Wrapper } from './parts/Wrapper'
import { LogOut } from './Logout';

export const MyPage = () => {
  const {currentUser } = useContext(AuthContext);
  const style = {
  };
  return (
    <>
    <Header />
    <Wrapper>
      <div style={style}>
        <p>{currentUser.name}のマイページ</p>
      </div>
    </Wrapper>
    </>
  )
};
