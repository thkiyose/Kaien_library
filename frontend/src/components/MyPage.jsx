import React, { useState,useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';
import { getMyPageInfo } from '../lib/api/user';
import { Header } from './parts/Header';
import { Wrapper } from './parts/Wrapper'
import { LogOut } from './Logout';

export const MyPage = () => {
  const [ user, setUser ] = useState({});
  const style = {
  };
  const { userId } = useParams();
  const getUserInfo = async(userId) => {
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
    <Header />
    <Wrapper>
    { user ?
      <div>
        <p>{user.name}のマイページ</p>
      </div>
    : <p>ユーザーが見つかりませんでした。</p>}
    </Wrapper>
    </>
  )
};
