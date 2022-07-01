import React from 'react';
import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import { Header } from './parts/Header';
import { Footer } from './parts/Footer';
import Color from './parts/Color';

const Div = styled.div`
  background: ${Color.primary};
  min-height: 100vh;
  height: auto;
  padding-top: 20px;
  position: relative;
`

export const Layout = () => {
  return (
    <Div>
      <Header />
      <Outlet />
      <Footer />
    </Div>
  )
}
