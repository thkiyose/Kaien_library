import React from 'react';
import styled from "styled-components";
import Color from './Color';


const WrapperDiv = styled.div`
  background-color: ${Color.secondary};
  margin:100px auto 0px auto;
  width: ${props => props.width};
  min-height: ${props => props.minHeight};
  padding: 30px;
  overflow: scroll;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.1);
  a {
    text-decoration: none;
  }
  ul {
    list-style :none;
  }
`

export const Wrapper = (props) => {

  return (
    <WrapperDiv width={props.width} minHeight={props.minHeight}>
      {props.children}
    </WrapperDiv>
  )
};
