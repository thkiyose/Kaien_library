import React from 'react';
import { Wrapper } from '../parts/Wrapper';
import { Link, Outlet } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';

export const AdminData = () => {
  return(
    <>
      <Wrapper width={"800px"}>
        <Outlet/>
      </Wrapper>
    </>
  );
};
