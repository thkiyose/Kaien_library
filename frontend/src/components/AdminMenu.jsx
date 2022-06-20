import React from 'react';
import { Header } from './parts/Header'
import { Wrapper } from './parts/Wrapper'

const style= {
  listStyle:"none"
};
const styledTitle= {
  fontSize: "1.5rem",
  fontWeight:"lighter"
};

export const AdminMenu = () => {
  return(
    <>
      <Header />
      <Wrapper>
        <div style={style}>
          <h1 style={styledTitle}>管理者メニュー</h1>
          <ul>
            <li><p>書籍の登録</p></li>
          </ul>
        </div>
      </Wrapper>
    </>
  );
};
