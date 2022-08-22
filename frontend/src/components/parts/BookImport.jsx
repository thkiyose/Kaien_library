import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { importBooksFromCSV } from '../../lib/api/admin';

export const BookImport = () => {
  const [ csv, setCsv ] = useState([]);
  const navigate = useNavigate();

  const handleFileSelect = async(e) => {
    const textFromCsv = await e.target.files[0].text()
    setCsv(parse(textFromCsv));
  }

  const parse = (text) => {
    return text.split('\r\n').map((row) => row.split(','));
  }

  const handleSubmit = async(csv) => {
    const res = await importBooksFromCSV(csv)

  }
  return (
    <>
      <p>書籍の登録に使用するCSVファイルを選択して下さい。</p>
      <input type="file" accept="text/csv" onChange={(e)=>{handleFileSelect(e)}} />
      <button onClick={()=>{handleSubmit(csv)}}>登録</button>
    </>
  );
}
