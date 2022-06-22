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
            <li><Link to='/admin/book_registration'>本の登録</Link></li>
          </ul>
        </div>
      </Wrapper>
    </>
  );
};
