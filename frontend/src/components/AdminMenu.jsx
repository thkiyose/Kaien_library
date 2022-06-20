import React from 'react';
import { Outlet, Link } from 'react-router-dom'
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
        <div style={style}>
          <h1 style={styledTitle}>管理者メニュー</h1>
          <ul>
            <li><Link to='/admin/book_registration'>本の登録</Link></li>
          </ul>
        </div>
    </>
  );
};
