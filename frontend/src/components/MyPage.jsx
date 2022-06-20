import React, { useState,useContext,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { getMyPageInfo } from '../lib/api/user';
import { Header } from './parts/Header';
import { Wrapper } from './parts/Wrapper'
import { LogOut } from './Logout';

export const MyPage = () => {
  const [ user, setUser ] = useState({});
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const style = {
  };
  const { userId } = useParams();
  const getUserInfo = async(userId) => {
    if (userId !== currentUser.id) {
      navigate(`${currentUser.id}`);
    }
    try {
      const res = await getMyPageInfo(userId);
      setUser(res.data.user);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  return (
    <>
    { user ?
      <div>
        <p>{user.name}のマイページ</p>
      </div>
    : <p>ユーザーが見つかりませんでした。</p>}
    </>
  )
};
