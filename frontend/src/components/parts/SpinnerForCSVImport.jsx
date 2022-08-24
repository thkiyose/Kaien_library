import React from 'react';
import styled from "styled-components";

export const SpinnerForCSVImport = (props) => {
  const { message, progressNow, progressMax } =props;

  return (
    <>
      <OverLay>
        <Container>
          <Loader/>
          <Message>{message}</Message>
          <p>{progressNow}/{progressMax}</p>
        </Container>
      </OverLay>
    </>
  );
}

const OverLay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  transition: all 0.5s ease-out;
`

const Container = styled.div`
  position: relative;
  top: 300px;
  z-index: 1001;
  margin: 0 auto;
`

const Message = styled.p`
  z-index: 1001;
  margin: 0 auto;
  padding: 3px;
  color: white;
  text-align:center;
`

const Loader = styled.div`
  border: 12px solid #fafafa;
  border-radius: 50%;
  margin: 0 auto;
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
  }
`
