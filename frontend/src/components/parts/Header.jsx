import React, { useContext } from 'react'
import { AuthContext } from '../../App';

export const Header = () => {
  const currentUser = useContext(AuthContext);
  const style = {
    width:"100%",
    backgroundColor:"rgb(249, 254, 207)",
    height:"50px",
    position:"fixed",
    top:"0",
    left:"0"
  };
  return (
    <>
    <div style={style}>
      Header
      <p>{currentUser.name}</p>
    </div>
    </>
  )
};
