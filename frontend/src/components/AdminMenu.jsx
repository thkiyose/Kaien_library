import React from 'react';
import { Link } from 'react-router-dom'

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
        <div style={style}>
          <h1 style={styledTitle}>管理者メニュー</h1>
          <ul>
            <li><Link to='/admin/book_registration'>本の登録</Link></li>
          </ul>
        </div>
    </>
  );
};
