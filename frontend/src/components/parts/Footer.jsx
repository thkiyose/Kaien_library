import React from 'react'
import styled from "styled-components";
import Color from './Color';

const FooterDiv = styled.div`
  background-color: ${Color.dark};
  color: #fff;
  text-align: center;
  padding: 0;
  width: 100%;
  height : 50px;
  position: absolute;/*←絶対位置*/
  bottom: 0;
  margin-bottom: -50px;
`
const Push = styled.div`
  height: 50px;
`

export const Footer = () => {

  return (
    <>
    <Push/>
    <FooterDiv>
      <p>2022 Tezuka</p>
    </FooterDiv>
    </>
  )
};
