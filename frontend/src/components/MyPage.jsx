import React, { useContext } from 'react';
import { Wrapper } from './parts/Wrapper';
import { Context } from '../App';

export const MyPage = () => {
  const { currentUser } = useContext(Context);

  return (
    <>
    <Wrapper width={"800px"}>
      { currentUser ?
        <div>
          <p>{currentUser.name}のマイページ</p>
        </div>
        : <p>ユーザーが見つかりませんでした。</p> }
    </Wrapper>
    </>
  )
};
