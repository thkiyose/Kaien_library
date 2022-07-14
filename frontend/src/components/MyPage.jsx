import React, { useContext } from 'react';
import { Wrapper } from './parts/Wrapper';
import { Context } from '../App';
import { Outlet, Link } from 'react-router-dom'
import styled from "styled-components";
import Color from './parts/Color';

const SideBar = styled.div`
  float: left;
  width: 20%;
  p {
    padding: 0;
  }
`
const Main = styled.div`
  float: right;
  width: 70%;
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
    <Wrapper width={"900px"}>
      { currentUser ?
        <>
          <SideBar>
            <p>{currentUser.name}のマイページ</p>
            <ul>
              <li><Link to="lendings">レンタル/予約一覧</Link></li>
            </ul>
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
