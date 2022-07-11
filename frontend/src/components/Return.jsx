import React from 'react';
import { useLocation } from 'react-router-dom';

export const Return = () => {
  const location = useLocation();
  const bookId = location.state;
  console.log(bookId.bookId);
  return (
    <div>テスト</div>
  );
};
