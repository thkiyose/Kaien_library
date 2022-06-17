import React from 'react';
import { signOut } from '../lib/api/session';
import { useNavigate } from 'react-router-dom';

export const LogOut = (props) => {
  const { setCurrentUser, setIsSignedIn } = props;
  const navigate = useNavigate();
  const style = {
    padding:"7px",
    border:"None",
    backgroundColor:"rgb(39, 93, 54)",
    color:"white",
    borderRadius:"5px",
    float:"right",
    marginRight:"50px",
    marginTop:"7px",
    fontWeight:"bold",
  };

  const handleLogOut = async() => {
    try {
      await signOut();
      setCurrentUser("");
      setIsSignedIn(false);
      navigate("/");
    } catch(e) {
      console.log(e);
    }
  };
  return <button style={style} onClick={handleLogOut}>ログアウト</button>
};
