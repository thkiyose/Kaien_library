import React from 'react';
import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import { Header } from './parts/Header';

const Div = styled.div`
  background: linear-gradient(#2e8b57 30%, #257a4a 90%);
  min-height: 100vh;
  height: auto;
  padding-bottom: 80px;
  padding-top: 20px;
`

export const Layout = () => {
  return (
    <Div>
      <Header />
      <Outlet />
    </Div>
  )
}
