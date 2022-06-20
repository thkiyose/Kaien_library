import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './parts/Header';
import { Wrapper } from './parts/Wrapper';

export const Layout = () => {
  return (
    <div>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  )
}
