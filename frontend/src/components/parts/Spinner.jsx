import React from 'react';
import styled from "styled-components";

export const Spinner = () => {
  return (
    <>
      <Container>
      <Loader/>
      <p>読み込み中...</p>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 400px;
  margin: 200px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
`

const Loader = styled.div`
  border: 12px solid #fafafa;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border-top: 12px solid #3498db;
  animation: spin 1s linear infinite;
  @keyframes spin{
  0%{
    transform: rotate(0deg);
  }

  100%{
    transform: rotate(360deg);
  }

`
