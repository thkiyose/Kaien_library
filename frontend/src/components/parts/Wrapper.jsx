import React from 'react'

export const Wrapper = (props) => {
  const style = {
    backgroundColor:"rgb(249, 254, 207)",
    margin:"100px auto 0px auto",
    padding:"30px",
    maxWidth:"60%",
    borderRadius:"3px"
  };
  return (
    <div style={style}>
      {props.children}
    </div>
  )
};
