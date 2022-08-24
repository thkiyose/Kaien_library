import React, { useEffect } from 'react';
import styled from "styled-components";
import Color from '../parts/Color';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper } from '../parts/Wrapper';

export const ImportComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const AvoidInvalidAccess = () => {
    if (!location?.state) {
      navigate("/admin/book_registration");
    }
  }

  useEffect(() => {AvoidInvalidAccess()});

  return (
    <>
      <Wrapper width="500px">
        <Message>{location.state?.count}件の書籍を登録しました。</Message>
        <Button onClick={() => {navigate("/books")}}>書籍一覧へ</Button>
      </Wrapper>
    </>
  );
};
const Message = styled.p`
  text-align:center;
`
const Button = styled.button`
  margin: 0 auto;
  margin-top: 20px;
  display: block;
  font-size: 1rem;
  width: 50%;
  text-align: center;
  border: 0;
  padding: 10px 40px;
  color: #ffffff;
  background-color: ${Color.primary};
  cursor: pointer;
`
