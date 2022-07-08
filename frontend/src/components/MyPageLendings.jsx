import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import Color from './parts/Color';
import { Context } from '../App';
import { fetchLendings } from '../lib/api/lending';

const Title = styled.h1`
  font-weight: lighter;
  font-size: 1.4rem;
`
export const MyPageLendings = () => {
  const { currentUser } = useContext(Context);
  const [ isLoading, setIsLoading ] = useState(true);

  const handleFetchLendings = async() => {
    const res = await fetchLendings(currentUser.id);
    console.log(res);
    setIsLoading(true);
  };

  useEffect(() => {handleFetchLendings()},[]);
  return (
    <>
      <Title>レンタル/予約一覧</Title>
      <ul>
      </ul>
    </>
  );
};
