import React, { useState } from 'react';
import Color from './Color';
import styled from "styled-components";
import { SpinnerForCSVImport } from './SpinnerForCSVImport';
import { useNavigate } from 'react-router-dom';
import { importBooksFromCSV } from '../../lib/api/admin';

export const BookImport = React.memo(() => {
  const [ csv, setCsv ] = useState([]);
  const [ isbnUsage, setIsbnUsage ] = useState("compliment");
  const [ fileName, setFileName ] = useState("");
  const [ error, setError ] = useState([]);
  const [ submitting, setSubmitting ] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = async(e) => {
    const textFromCsv = await e.target.files[0].text()
    setFileName(e.target.files[0].name)
    setCsv(parse(textFromCsv));
  }
  const handleUsageSelect = (e) => {
    setIsbnUsage(e.target.value);
  }

  const parse = (text) => {
    return text.split('\r\n').map((row) => row.split(','));
  }

  const handleSubmit = async(csv,isbnUsage) => {
    if (csv.length > 1){
      setSubmitting(true);
      const res = await importBooksFromCSV(csv,isbnUsage)
      if (res.data.process === "COMPLETE"){
        navigate("result", {state: {result: res.data.result, successCount: res.data.successCount, failureCount: res.data.failureCount}})
      } else if (res.data.process === "FAILURE") {
        setError(res.data.error);
      }
      setSubmitting(false);
    } else {
      const res = await importBooksFromCSV(csv,isbnUsage)
      setError(res.data.error);
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
      <Radios>
        <p>ISBNコードによる情報取得方法</p>
        <p><input defaultChecked onClick={(e)=>{handleUsageSelect(e)}} type="radio" name="IsbnUsage" value="compliment"/>必須項目が欠けている時のみ、ISBNコードを使用して情報の補完を試みる。</p>
        <p><input onClick={(e)=>{handleUsageSelect(e)}} type="radio" name="IsbnUsage" value="override"/>ISBNコードがある限り情報を取得し、CSV上のデータに上書きして保存する。</p>
        <p><input onClick={(e)=>{handleUsageSelect(e)}} type="radio" name="IsbnUsage" value="none"/>情報を取得しない。</p>
      </Radios>
      <SubmitButton onClick={()=>{handleSubmit(csv,isbnUsage)}}>読み込む</SubmitButton>
      <Error>{error}</Error>
      {submitting === true && <SpinnerForCSVImport message={"CSVを読み込んでいます..."} />}
    </>
  );
})

const Error = styled.p`
  text-align:center;
`

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
const Radios = styled.div`
  margin-top: 20px;
  p {
    margin: 0;
    padding: 5px;
  }`

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
