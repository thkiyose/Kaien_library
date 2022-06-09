import React from 'react';
import { Header } from './parts/Header'
import { Wrapper } from './parts/Wrapper'
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <p>ログイン</p>
        <Link to='' >新規登録</Link>
      </Wrapper>
    </>
  );
};
