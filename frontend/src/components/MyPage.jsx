import React, { useContext } from 'react'
import { AuthContext } from '../App';

export const MyPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
    { currentUser ?
      <div>
        <p>{currentUser.name}のマイページ</p>
      </div>
      : <p>ユーザーが見つかりませんでした。</p> }
    </>
  )
};
