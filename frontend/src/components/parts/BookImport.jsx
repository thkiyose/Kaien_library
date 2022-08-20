import React, { useState,useRef } from 'react';
import { importBooksFromCSV } from '../../lib/api/admin';

export const BookImport = () => {
  const [ csv, setCsv ] = useState([]);

  const handleFileSelect = async(e) => {
    const textFromCsv = await e.target.files[0].text()
    setCsv(parse(textFromCsv));
  }

  const parse = (text) => {
    return text.split('\r\n').map((row) => row.split(','));
  }

  const handleSubmit = async(csv) => {
    const res = await importBooksFromCSV(csv)
    console.log(res)
  }
  return (
    <>
      <p>書籍の登録に使用するCSVファイルを選択して下さい。</p>
      <input type="file" accept="text/csv" onChange={(e)=>{handleFileSelect(e)}} />
      <button onClick={()=>{handleSubmit(csv)}}>登録</button>
    </>
  );
}
