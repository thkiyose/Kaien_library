import React from 'react';
import { Header } from './parts/Header'
import { Wrapper } from './parts/Wrapper'
import { Link } from 'react-router-dom';

export const Login = (props) => {
  return (
    <>
      <Header />
      <Wrapper>
        <p>ログイン</p>
        <h2>ログイン状態: {props.loggedInStatus}</h2>
        <Link to='/signup' >新規登録</Link>
      </Wrapper>
    </>
  );
};
