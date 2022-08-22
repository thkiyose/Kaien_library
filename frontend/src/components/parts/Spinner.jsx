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
  margin: 0 auto;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: fadeIn 1s ease 0.3s 1 normal;
  animation: fadeOut 1s ease 0.3s 1 normal;
  @keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  @keyframes fadeOut {
    0% {opacity: 0}
    100% {opacity: 1}
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
