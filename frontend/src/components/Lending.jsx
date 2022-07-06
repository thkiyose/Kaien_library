import React from 'react';
import { Wrapper } from './parts/Wrapper';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Color from './parts/Color';

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
`
const EmptyGuide = styled.div`
  margin: 20px auto;
  background-color:${Color.text};
  padding: 20px;
  text-align: center;
`

export const Lending = () => {
  const location = useLocation();
  const bookId = location.state;
  const navigate = useNavigate();

  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        {bookId ?
          <p>{bookId.bookId}</p>
        :
          <EmptyGuide>書籍の情報を取得できません。書籍詳細画面からレンタル操作を行って下さい。</EmptyGuide>
        }
      </Wrapper>
    </>
  );
};
