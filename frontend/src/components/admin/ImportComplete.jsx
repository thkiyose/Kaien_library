import React, { useEffect } from 'react';
import styled from "styled-components";
import Color from './parts/Color';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper } from './parts/Wrapper';

export const ImportComplete = () => {
  const location = useLocation();
  const {status, count} = location.state;
  const navigate = useNavigate();

  const AvoidInvalidAccess = () => {
    if (!status) {
      navigate("/admin/book_registration");
    }
  }

  useEffect(() => {AvoidInvalidAccess()});

  return (
    <>
      <Wrapper width="500px">
        <p>{count}件の書籍を登録しました。</p>
        <button onClick={() => {navigate("/books")}}>書籍一覧へ</Button>
      </Wrapper>
    </>
  );
};
