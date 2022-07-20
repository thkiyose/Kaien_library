import React, { useEffect } from 'react';
import styled from "styled-components";
import Color from './parts/Color';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper } from './parts/Wrapper';

const Reserved = styled.div`
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


export const ReservationCreated = () => {
  const location = useLocation();
  const isReserved = location.state;
  const navigate = useNavigate();

  const AvoidInvalidAccess = () => {
    if (!isReserved) {
      navigate("/books");
    }
  }

  useEffect(() => {AvoidInvalidAccess()});

  return (
    <>
      <Wrapper width="500px">
        <Reserved>
          <p>RESERVATION</p>
          <p>COMPLETE</p>
        </Reserved>
        <Message>予約が完了しました。マイページから予約状況を確認出来ます。</Message>
        <Button onClick={() => {navigate("/mypage/lendings")}}>マイページに戻る</Button>
      </Wrapper>
    </>
  );

};
