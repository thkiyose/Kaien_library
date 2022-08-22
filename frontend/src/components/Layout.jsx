import React,{ useContext } from 'react';
import { Context } from '../App';
import styled from "styled-components";
import { Outlet } from 'react-router-dom';
import { Header } from './parts/Header';
import { Footer } from './parts/Footer';
import { Spinner } from './parts/Spinner';
import Color from './parts/Color';

const Div = styled.div`
  background: ${Color.primary};
  min-height: 100vh;
  height: auto;
  padding-top: 20px;
  position: relative;
  min-height: calc(100vh - 50px);
`

export const Layout = () => {
  const { loading } = useContext(Context);
  console.log(loading);
  return (
    <Div>
      <Header />
      { loading === false ?
        <Outlet /> : <Spinner/>
      }
      <Footer />
    </Div>
  )
}
