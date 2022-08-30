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
          <ul>
            <li><Link to="books">書籍データ一覧</Link></li>
            <li><Link to="users">ユーザーデータ一覧</Link></li>
            <li><Link to="lendings">貸出データ一覧</Link></li>
            <li><Link to="reservations">予約データ一覧</Link></li>
            <li><Link to="reviews">レビューデータ一覧</Link></li>
            <li><Link to="categories">カテゴリデータ一覧</Link></li>
            <li><Link to="locations">収蔵場所データ一覧</Link></li>
          </ul>
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
  p {
    padding: 0;
    text-align: center;
    margin: 0;
  }
  ul {
    padding: 0px 0px 0px 20px;
    a {
      color: black;
      padding: 5px;
      margin-right: 10px;
      display:block;
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
