import React, { useState } from 'react';
import { importBooksFromCSV } from '../../lib/api/admin';

export const BookImport = () => {
  const [ csv, setCsv ] = useState("");

  const handleImport = async() => {
    const csv = document.getElementById("csvInput").files[0]
    const res = await importBooksFromCSV(document.getElementById("csvInput").files[0]);
    console.log(res);
  }

  return (
    <>
      <p>書籍の登録に使用するCSVファイルを選択して下さい。</p>
      <input type="file" id="csvInput" accept="text/csv"/>
      <input type="submit" onClick={()=>{handleImport()}} value="書籍を登録する"/>
    </>
  );
}
