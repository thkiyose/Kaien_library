import React from 'react';
import styled from "styled-components";

const Wrapper_div = styled.div`
  background-color: #e6fff1;
  margin:100px auto 0px auto;
  width: ${props => props.width};
  padding: 40px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  a {
    text-decoration: none;
  }
  ul {
    list-style :none;
  }
`

export const Wrapper = (props) => {

  return (
    <Wrapper_div width={props.width}>
      {props.children}
    </Wrapper_div>
  )
};
