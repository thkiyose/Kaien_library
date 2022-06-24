import React, { useState, useContext } from 'react';
import { Context } from '../../App';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { fetchBookInfo } from '../../lib/api/book';

const RegisterButton = styled.input`
  display: block;
  padding: 10px;
  font-size: 1rem;
  background-color: #2e8b57;
  border: 0;
  outline: 0;
  color: white;
  margin: 0 auto;
  width: 60%;
`
const RequireGuide = styled.p`
  font-size:0.8rem;
`
const Required = styled.span`
  color: red;
  padding-right: 10px;
`
const Form = styled.form`
  .isbnInput {
    border-bottom: solid rgb(213, 213, 213) 1px;
    margin-bottom: 10px;
  }
  button {
    padding: 7px;
    font-size: 0.8rem;
    background-color: #2e8b57;
    border: 0;
    outline: 0;
    color: white;
    margin-left: 10px;
  }
  input[type="text"]{
    background: white;
    border: none;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
    padding: 5px;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 10px;
  }
  select{
    background: white;
    border: none;
    padding: 5px;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  }
  textarea {
    background: white;
    border: none;
    padding: 5px;
    width: 800px;
    height: 150px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  }
`
const TitleDiv = styled.div`
  width: 50%;
  float: left;
  input {
    width: 60%;
  }
`
const AuthorDiv = styled.div`
  width:50%;
  float: right;
  input {
    width: 60%;
  }
`
const PublishedYearDiv = styled.div`
  width:50%;
  input {
    width: 60%;
  }
  label{
    padding-left: 16px;
  }
`
const VersionDiv = styled.div`
  width: 50%;
  float: left;
  label {
    display: inline;
    padding-right: 17px;
  }
  p {
    display: inline;
  }
  input {
    width: 10%;
  }
`
const CategoryDiv = styled.div`
  width: 50%;
  float: right;
  input {
    width: 60%;
  }
`
const LocationDiv = styled.div`
  margin-bottom: 30px;
  width: 100%;
  input {
    width: 100%;
  }
`
const RegisterTitle = styled.h1`
  text-align: center;
  font-weight: lighter;
  color: rgb(85, 85, 85);
  }
`
const ClearFix = styled.div`
  content: "";
  display: block;
  clear: both;
`

export const BookForm = () => {
  const { register, setValue, getValues, handleSubmit,formState: { errors } } = useForm();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isbnError, setIsbnError ] = useState();
  const { categories, locations } = useContext(Context);

  const handleFetchBookInfo = async() => {
    const isbnInput = getValues("isbn");
    if (/^[0-9]{10}$/.test(isbnInput) === false && /^[0-9]{13}$/.test(isbnInput) === false ) {
      setIsbnError("ISBNの形式が正しくありません。(10桁または13桁の半角数字)");
    } else {
      setIsbnError("");
      try {
        setIsLoading(true);
        const res = await fetchBookInfo({isbn:isbnInput});
        if (res.data.data.totalItems > 0) {
          setValue("title",res.data.data.items[0].volumeInfo.title);
          setValue("author",res.data.data.items[0].volumeInfo.authors);
          setValue("published_year",res.data.data.items[0].volumeInfo.publishedDate.slice(0,4));
          setValue("description",res.data.data.items[0].volumeInfo.description);
        } else {
          setIsbnError("書籍情報が見つかりませんでした。")
        }
        setIsLoading(false);
      } catch(e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <RegisterTitle>書籍の登録</RegisterTitle>
      <Form>
        <div className="isbnInput">
          <input type="text" name="isbn" {...register("isbn")}/><button type="button" onClick={handleFetchBookInfo}>ISBNから情報を取得</button>
          <p>{isbnError}</p>
          { !isLoading || <p>書籍データを検索しています…</p>}
        </div>
          <RequireGuide><Required>*</Required>は必須項目です。</RequireGuide>
          <TitleDiv>
            <label>タイトル</label><Required>*</Required>
            <input type="text" name="title" {...register("title", { required: true, maxLength: 255 })}/>
            {errors.title?.type === "required" && <span>タイトルを入力して下さい。</span>}
            {errors.title?.type === "maxLength" && <span>タイトルが長すぎます。255文字以内で入力して下さい。</span>}
          </TitleDiv>
          <AuthorDiv>
            <label>著者名</label><Required>*</Required>
            <input type="text" name="author" {...register("author", { required: true, maxLength: 255 })}/>
            {errors.author?.type === "required" && <span>著者名を入力して下さい。</span>}
            {errors.author?.type === "maxLength" && <span>著者名が長すぎます。255字以内で入力して下さい。</span>}
          </AuthorDiv>
          <PublishedYearDiv>
            <label>出版年</label><Required>*</Required>
            <input type="text" name="published_year" {...register("published_year", { required: true, pattern: /[0-9]{4}/ })}/>
            {errors.published_year?.type === "pattern" && <span>出版年の形式が正しくありません。半角数字4桁で入力して下さい。</span>}
          </PublishedYearDiv>
          <div>
            <label>本の詳細</label><Required>*</Required>
            <textarea name="description" {...register("description", { required: true })}/>
          </div>
          <VersionDiv>
            <label>版数</label>
            <p><input type="text" name="version" {...register("version", { maxLength: 2 })} />版</p>
            {errors.version?.type === "maxLength" && <span>2桁以内で入力して下さい。</span>}
          </VersionDiv>
          <CategoryDiv>
            <label>カテゴリー</label><Required>*</Required>
            <select name="category_id" {...register("category_id", { required: true })}>
              {Object.keys(categories).map((key) => {
                return (
                  <option key={key} value={categories[key].id}>{categories[key].category}</option>
                );
              })}
            </select>
            {errors.category_id?.type === "required" && <span>カテゴリーを選んで下さい。</span>}
          </CategoryDiv>
          <ClearFix/>
          <LocationDiv>
            <label>場所</label><Required>*</Required>
            <select name="location_id" {...register("location_id", { required: true })}>
              {Object.keys(locations).map((key) => {
                return (
                  <option key={key} value={locations[key].id}>{locations[key].location}</option>
                );
              })}
            </select>
          </LocationDiv>
          <RegisterButton value="登録" type="submit" />
        </Form>
      </>
    );
};
