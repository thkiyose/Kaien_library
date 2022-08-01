import React,{ useContext } from 'react';
import { Context } from '../App';
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
  min-height: calc(100vh - 50px);
`
const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Layout = () => {
  const { loading } = useContext(Context);
  return (
    <Div>
      <Header />
      <Outlet />
      <Footer />
    </Div>
  )
}
