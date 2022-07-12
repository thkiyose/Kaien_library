import React, { useEffect } from 'react';
import styled from "styled-components";
import Color from './parts/Color';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper } from './parts/Wrapper';

const ThankYou = styled.div`
  text-align: center;
  font-size: 3rem;
  letter-spacing: 1rem;
  color: ${Color.primary};
  text-shadow: 7px 0px 0px ${Color.primary};
  p {
    margin: 0;
  }
`
const Message = styled.p`
  text-align: center;
  padding: 20px;
  font-weight: lighter;
`
const Button = styled.button`
   width: 100%;
   padding: 20px;
   background-color: ${Color.primary};
   color : white;
   border: none;
   font-size: 1rem;
   cursor: pointer;
`

export const ThankYouForLending = () => {
  const location = useLocation();
  const bookLent = location.state;
  const navigate = useNavigate();

  const AvoidInvalidAccess = () => {
    if (!bookLent) {
      navigate("/books");
    }
  }

  useEffect(() => {AvoidInvalidAccess()});

  return (
    <>
      <Wrapper width="500px">
        <ThankYou>
          <p>THANK</p>
          <p>YOU!</p>
        </ThankYou>
        <Message>他の利用者に迷惑がかからないよう返却期限を守りましょう！</Message>
        <Button onClick={() => {navigate("/books")}}>書籍一覧へ</Button>
      </Wrapper>
    </>
  );
};
