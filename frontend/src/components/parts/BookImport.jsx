import React, { useState, useContext } from 'react';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { importBooksFromCSV } from '../../lib/api/admin';

export const BookImport = () => {
  const [ csv, setCsv ] = useState([]);
  const [ error, setError ] = useState([]);
  const { setLoading } = useContext(Context);
  const navigate = useNavigate();

  const handleFileSelect = async(e) => {
    const textFromCsv = await e.target.files[0].text()
    setCsv(parse(textFromCsv));
  }

  const parse = (text) => {
    return text.split('\r\n').map((row) => row.split(','));
  }

  const handleSubmit = async(csv) => {
    setLoading(true);
    const res = await importBooksFromCSV(csv)
    if (res.data.process === "COMPLETE"){
      navigate("result", {state: {result: res.data.result, successCount: res.data.successCount, failureCount: res.data.failureCount}})
      setLoading(false);
    } else if (res.data.process === "FAILURE") {
      setError(res.data.error);
      setLoading(false);
    }
  }
  return (
    <>
      <p>書籍の登録に使用するCSVファイルを選択して下さい。</p>
      <FileDiv>
        <input type="file" accept="text/csv" onChange={(e)=>{handleFileSelect(e)}} />
      </FileDiv>
      <button onClick={()=>{handleSubmit(csv)}}>登録</button>
      <p>{error}</p>
    </>
  );
}
const FileDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: ${Color.text};
  border-radius: 10px;
  text-align: center;
  input button {
    padding: 7px;
    font-size: 0.8rem;
    background-color: ${Color.primary};
    border: 0;
    outline: 0;
    color: white;
    margin-left: 10px;
    cursor: pointer;
  }
`
