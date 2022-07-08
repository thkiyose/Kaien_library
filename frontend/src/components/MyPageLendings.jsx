import React, { useContext } from 'react';
import styled from "styled-components";
import Color from './parts/Color';
import { Context } from '../App';

const Title = styled.h1`
  font-weight: lighter;
  font-size: 1.4rem;
`
export const MyPageLendings = () => {
  const { currentUser } = useContext(Context);

  return (
    <>
      <Title>レンタル/予約一覧</Title>
      <ul>
      </ul>
    </>
  );
};
