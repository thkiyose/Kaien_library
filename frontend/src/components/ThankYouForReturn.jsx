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

export const ThankYouForReturn= () => {
  const location = useLocation();
  const bookReturned = location.state;
  const navigate = useNavigate();

  const AvoidInvalidAccess = () => {
    if (!bookReturned) {
      navigate("/mypage/lendings");
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
        <Message>ご利用ありがとうございました。</Message>
        <Button onClick={() => {navigate("/mypage/lendings")}}>マイページに戻る</Button>
      </Wrapper>
    </>
  );
};
