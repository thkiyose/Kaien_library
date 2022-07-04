import React from 'react';
import { signOut } from '../lib/api/session';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Color from './parts/Color';

const Button = styled.button`
  padding: 7px;
  border: none;
  background-color: ${Color.primary};
  color: white;
  margin-right: 50px;
  font-weight: bold;
  cursor: pointer;
`

export const LogOut = (props) => {
  const { setCurrentUser, setIsSignedIn } = props;
  const navigate = useNavigate();

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
  return <Button onClick={handleLogOut}>ログアウト</Button>
};
