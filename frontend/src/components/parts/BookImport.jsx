import React, { useState, useContext } from 'react';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { importBooksFromCSV } from '../../lib/api/admin';

export const BookImport = () => {
  const [ csv, setCsv ] = useState([]);
  const [ fileName, setFileName ] = useState("");
  const [ error, setError ] = useState([]);
  const { setLoading } = useContext(Context);
  const navigate = useNavigate();

  const handleFileSelect = async(e) => {
    const textFromCsv = await e.target.files[0].text()
    setFileName(e.target.files[0].name)
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
        <label>
          <input type="file" name="file" accept="text/csv" onChange={(e)=>{handleFileSelect(e)}} />ファイルを選択
        </label>
        <p>{fileName}</p>
      </FileDiv>
      <SubmitButton onClick={()=>{handleSubmit(csv)}}>登録する</SubmitButton>
      <p>{error}</p>
    </>
  );
}
const FileDiv = styled.div`
  width: 80%;
  min-height: 80px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${Color.text};
  border-radius: 10px;
  text-align: center;
  label {
    padding: 10px 40px;
    color: #ffffff;
    background-color: ${Color.primary};
    cursor: pointer;
  }
  input[type="file"] {
    padding: 7px;
    font-size: 0.8rem;
    display:none;
    background-color: ${Color.primary};
    border: 0;
    outline: 0;
    color: white;
    margin-left: 10px;
    cursor: pointer;
  }
`

const SubmitButton = styled.button`
  margin: 0 auto;
  margin-top: 20px;
  display: block;
  font-size: 1rem;
  width: 50%;
  text-align: center;
  border: 0;
  padding: 10px 40px;
  color: #ffffff;
  background-color: ${Color.primary};
  cursor: pointer;
`
