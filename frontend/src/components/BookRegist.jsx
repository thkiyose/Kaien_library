import React, { useContext } from 'react';
import { Wrapper } from './parts/Wrapper';
import { Context } from '../App';
import { Outlet, Link } from 'react-router-dom'
import styled from "styled-components";
import Color from './parts/Color';


export const MyPage = () => {
  const { currentUser } = useContext(Context);

  return (
    <>
    <Wrapper width={"800px"}>
      <Outlet />
    </Wrapper>
    </>
  )
};
