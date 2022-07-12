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
  margin-bottom: 30px;
`
const Message = styled.p`
  text-align: center;
`
const Button = styled.button`
   width: 100%;
   padding: 20px;
   background-color: ${Color.primary};
   color : white;
   border: none;
   font-size: 1rem;
   cursor: pointer;
   margin-top: 20px;
`

const MarkLocation = styled.span`
  background-color: ${Color.light};
  padding: 10px;
  border-radius: 20px;
  color:white;
`

export const ThankYouForLending = () => {
  const location = useLocation();
  const {bookLent, bookLocation} = location.state;
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
        <Message>書籍の所在地:<MarkLocation>{bookLocation}</MarkLocation>で本を受け取って下さい。</Message>
        <Message>他の利用者に迷惑がかからないよう返却期限を守りましょう！</Message>
        <Button onClick={() => {navigate("/books")}}>書籍一覧へ</Button>
      </Wrapper>
    </>
  );
};
