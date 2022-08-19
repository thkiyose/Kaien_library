import React from 'react';
import { importBooksFromCSV } from '../../lib/api/admin';

export const BookImport = () => {
  return (
    <>
      <p>書籍の登録に使用するCSVファイルを選択して下さい。</p>
      <input type="file" accept="text/csv"/>
      <input type="submit" value="書籍を登録する"/>
    </>
  );
}
