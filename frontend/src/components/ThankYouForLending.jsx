import React, { useEffect } from 'react';
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper } from './parts/Wrapper';
import { Link } from 'react-router-dom'

export const ThankYouForLending = () => {
  const location = useLocation();
  const bookReturned = location.state;
  const navigate = useNavigate();

  const AvoidInvalidAccess = () => {
    if (!bookReturned) {
      navigate("/mypage/lendings");
    }
  }

  useEffect(() => {AvoidInvalidAccess()}, bookReturned);

  return (
    <>
      <Wrapper width="500px">
        <p>ご利用ありがとうございました。</p>
        <Link to="/mypage/lendings">マイページに戻る</Link>
      </Wrapper>
    </>
  );
};
