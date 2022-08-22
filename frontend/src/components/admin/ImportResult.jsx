import React, { useState } from 'react';
import { Wrapper } from '../parts/Wrapper';
import { useLocation } from 'react-router-dom';

export const ImportResult = () => {
  const location = useLocation();
  const result = location.state;
  console.log(result);
  return (
    <>
      <Wrapper width={"800px"}>
        <h1>インポート結果</h1>
        <p></p>
      </Wrapper>
    </>
  );
}
