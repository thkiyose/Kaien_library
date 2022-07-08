import React, { useContext } from 'react';
import { Wrapper } from './parts/Wrapper';
import { Context } from '../App';
import { Outlet } from 'react-router-dom'
import styled from "styled-components";
import Color from './parts/Color';

const SideBar = styled.div`
  float: left;
`
const Main = styled.div`
  float: right;
`

const ClearFix = styled.div`
  content: "";
  display: block;
  clear: both;
`

export const MyPage = () => {
  const { currentUser } = useContext(Context);

  return (
    <>
    <Wrapper width={"800px"}>
      { currentUser ?
        <>
          <SideBar>
            <p>{currentUser.name}のマイページ</p>
          </SideBar>
          <Main>
            <Outlet />
          </Main>
          <ClearFix />
        </>
        : <p>ユーザーが見つかりませんでした。</p> }
    </Wrapper>
    </>
  )
};
