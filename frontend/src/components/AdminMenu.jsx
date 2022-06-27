import React from 'react';
import { Wrapper } from './parts/Wrapper';
import { Link } from 'react-router-dom';

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
      <Wrapper width={"800px"}>
        <div style={style}>
          <h1 style={styledTitle}>管理者メニュー</h1>
          <ul>
            <li><Link to='/admin/books/index'>書籍の一覧</Link></li>
            <li><Link to='/admin/book_registration'>書籍の登録</Link></li>
          </ul>
        </div>
      </Wrapper>
    </>
  );
};
