import React, { useState,useRef } from 'react';
import { importBooksFromCSV } from '../../lib/api/admin';
import CSVReader from 'react-csv-reader'

export const BookImport = () => {
  const [ csv, setCsv ] = useState([]);

  const handleSubmit = async(csv) => {
    const res = await importBooksFromCSV(csv)
    console.log(res)
  }
  return (
    <>
      <p>書籍の登録に使用するCSVファイルを選択して下さい。</p>
      <CSVReader onFileLoaded={(e)=>{setCsv(e)}} />
      <button onClick={()=>{handleSubmit(csv)}}>登録</button>
    </>
  );
}
