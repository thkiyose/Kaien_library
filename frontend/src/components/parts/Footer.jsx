import React from 'react'
import styled from "styled-components";
import Color from './Color';

const FooterDiv = styled.div`
  background-color: ${Color.dark};
  color: #fff;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  width: 100%;
  position: absolute;/*←絶対位置*/
  bottom: 0;
`

export const Footer = () => {

  return (
    <>
    <FooterDiv>
      <p>2022 Tezuka</p>
    </FooterDiv>
    </>
  )
};
