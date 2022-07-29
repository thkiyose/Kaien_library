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
    text-align: center;
    margin: 0;
  }
  ul {
    padding: 0px 0px 0px 15px;
    a {
      color: black;
      padding: 5px;
    }
    a:hover {
      background-color: ${Color.text};
    }
  }
`
const Main = styled.div`
  float: right;
  width: 80%;
`
const Icon = styled.img`
  height: 60px;
  margin: 0 auto;
  display: block;
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
            <Icon src={`${process.env.PUBLIC_URL}/user.png`} />
            <p>{currentUser.name}</p>
            <p>{currentUser.email}</p>
            <ul>
              <li><Link to="lendings">レンタル/予約一覧</Link></li>
              <li><Link to="reviews">投稿したレビュー</Link></li>
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
