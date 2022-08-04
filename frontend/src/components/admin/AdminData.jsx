import React from 'react';
import { Wrapper } from '../parts/Wrapper';
import { Link, Outlet } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';

export const AdminData = () => {
  return(
    <>
      <Wrapper width={"1000px"}>
        <SideBar>
        <p>aaa</p>
        </SideBar>
        <Main>
          <Outlet/>
        </Main>
      </Wrapper>
    </>
  );
};

const SideBar = styled.div`
  width: 20%;
  float: left;
`
const Main = styled.div`
  float: right;
  width: 80%;
`
