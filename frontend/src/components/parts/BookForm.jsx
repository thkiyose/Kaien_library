import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { fetchBookInfo } from '../../lib/api/book';
import { createBook } from '../../lib/api/book';

const RegisterButton = styled.input`
  display: block;
  padding: 10px;
  font-size: 1rem;
  background-color: ${Color.primary};
  border: 0;
  outline: 0;
  color: white;
  margin: 0 auto;
  width: 60%;
  cursor: pointer;
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
  }
  button {
    padding: 7px;
    font-size: 0.8rem;
    background-color: ${Color.primary};
    border: 0;
    outline: 0;
    color: white;
    margin-left: 10px;
    cursor: pointer;
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
const ImageDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: ${Color.text};
  border-radius: 10px;
  text-align :center;
  label {
    display:block;
  }
  input {
    padding-top: 20px;
    text-align: center;
    width: 50%;
  }
  img {
    max-width: 128px;
    display:block;
    float: left;
  }
`
const TitleDiv = styled.div`
  margin-top: 20px;
  width: 50%;
  float: left;
  input {
    width: 60%;
  }
`
const AuthorDiv = styled.div`
  width:50%;
  margin-top: 20px;
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
`
const ErrorMessage = styled.p`
  margin: 0;
  margin-top: 0;
  font-size: 0.8rem;
  padding-left: 2px;
`
const ClearFix = styled.div`
  content: "";
  display: block;
  clear: both;
`
const AfterCreated = styled.div`
  background-color: ${Color.text};
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
`

export const BookForm = () => {
  const { register, setValue, getValues, reset, resetField, handleSubmit,formState: { errors } } = useForm();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ isbnError, setIsbnError ] = useState();
  const [ imageError, setImageError ] = useState();
  const [ afterCreatedGuide, setAfterCreatedGuide ] = useState();
  const [ afterCreatedUrl, setAfterCreatedUrl ] = useState();
  const { categories, locations } = useContext(Context);
  const [ imageInputed, setImageInputed ] = useState("");

  const handleFetchBookInfo = async() => {
    const isbnInput = getValues("isbn");
    if (/^[0-9]{10}$/.test(isbnInput) === false && /^[0-9]{13}$/.test(isbnInput) === false ) {
      setIsbnError("ISBN???????????????????????????????????????(10????????????13??????????????????)");
    } else {
      setIsbnError("");
      try {
        setIsLoading(true);
        setImageError("")
        const res = await fetchBookInfo({isbn:isbnInput});
        if (res.data.data.totalItems > 0) {
          setValue("title",res.data.data.items[0].volumeInfo.title);
          setValue("author",res.data.data.items[0].volumeInfo.authors?.join(","));
          setValue("published_year",res.data.data.items[0].volumeInfo.publishedDate?.slice(0,4));
          setValue("description",res.data.data.items[0].volumeInfo.description);
          setValue("image_url", res.data.data.items[0].volumeInfo.imageLinks?.thumbnail);
          setImageInputed(res.data.data.items[0].volumeInfo.imageLinks?.thumbnail);
        } else {
          setIsbnError("????????????????????????????????????????????????")
        }
        setIsLoading(false);
      } catch(e) {
        console.log(e);
      }
    }
  };
  const deleteImage = () => {
    resetField("image_url");
    setImageInputed("");
    setImageError("");
  }

  const handleImageError = (e) => {
    setImageInputed("");
    setImageError("??????????????????????????????????????????");
  }

  return (
    <>
      <RegisterTitle>???????????????</RegisterTitle>
      <Form onSubmit={handleSubmit(async(data) => {
        try {
          const res = await createBook({book:data});
          setIsSubmitting(true);
          if (res.data.status === 'SUCCESS') {
            setAfterCreatedGuide("??????????????????????????????");
            setAfterCreatedUrl(`/books/${res.data.data.id}`);
            reset();
            resetField("image_url");
            setImageInputed("");
            setImageError("");
            setIsSubmitting(false);
          }
        } catch (e) {
          console.log(e);
          setIsSubmitting(false);
          setAfterCreatedGuide("??????????????????????????????")
        }})}>
        <div className="isbnInput">
          <input type="text" name="isbn" {...register("isbn")}/><button type="button" onClick={handleFetchBookInfo}>ISBN?????????????????????</button>
          <p>{isbnError}</p>
          { !isLoading || <p>??????????????????????????????????????????</p>}
        </div>
          <RequireGuide><Required>*</Required>????????????????????????</RequireGuide>
          <ImageDiv>
            { imageInputed && <img alt="bookimage" src={imageInputed}???onError={handleImageError}  />}
            <div>
              <label>??????URL</label>
              <input type="text" name="image_url" {...register("image_url")} />
              <button type="button" onClick={() => setImageInputed(getValues("image_url"))}>???????????????</button>
              { getValues("image_url") && <button onClick={deleteImage}>??????</button> }
              <p>{imageError}</p>
            </div>
            <ClearFix/>
          </ImageDiv>
          <TitleDiv>
            <label>????????????</label><Required>*</Required>
            <input type="text" name="title" {...register("title", { required: true, maxLength: 255 })}/>
            {errors.title?.type === "required" && <ErrorMessage>???????????????????????????????????????</ErrorMessage>}
            {errors.title?.type === "maxLength" && <ErrorMessage>?????????????????????????????????255???????????????????????????????????????</ErrorMessage>}
          </TitleDiv>
          <AuthorDiv>
            <label>?????????</label><Required>*</Required>
            <input type="text" name="author" {...register("author", { required: true, maxLength: 255 })}/>
            {errors.author?.type === "required" && <ErrorMessage>????????????????????????????????????</ErrorMessage>}
            {errors.author?.type === "maxLength" && <ErrorMessage>??????????????????????????????255????????????????????????????????????</ErrorMessage>}
          </AuthorDiv>
          <ClearFix/>
          <PublishedYearDiv>
            <label>?????????</label><Required>*</Required>
            <input type="text" name="published_year" {...register("published_year", { required: true, pattern: /[0-9]{4}/ })}/>
            {errors.published_year?.type === "required" && <ErrorMessage>????????????????????????????????????</ErrorMessage>}
            {errors.published_year?.type === "pattern" && <ErrorMessage>????????????????????????????????????????????????????????????4??????????????????????????????</ErrorMessage>}
          </PublishedYearDiv>
          <div>
            <label>????????????</label><Required>*</Required>
            <textarea name="description" {...register("description", { required: true })}/>
            {errors.description?.type === "required" && <ErrorMessage>????????????????????????????????????</ErrorMessage>}
          </div>
          <VersionDiv>
            <label>??????</label>
            <p><input type="text" name="version" {...register("version", { maxLength: 2 })} />???</p>
            {errors.version?.type === "maxLength" && <ErrorMessage>2????????????????????????????????????</ErrorMessage>}
          </VersionDiv>
          <CategoryDiv>
            <label>???????????????</label><Required>*</Required>
            <select name="category_id" {...register("category_id", { required: true })}>
              {Object.keys(categories).map((key) => {
                return (
                  <option key={key} value={categories[key].id}>{categories[key].category}</option>
                );
              })}
            </select>
            {errors.category_id?.type === "required" && <ErrorMessage>???????????????????????????????????????</ErrorMessage>}
          </CategoryDiv>
          <ClearFix/>
          <LocationDiv>
            <label>??????</label><Required>*</Required>
            <select name="location_id" {...register("location_id", { required: true })}>
              {Object.keys(locations).map((key) => {
                return (
                  <option key={key} value={locations[key].id}>{locations[key].location}</option>
                );
              })}
            </select>
            {errors.location_id?.type === "required" && <ErrorMessage>??????????????????????????????</ErrorMessage>}
          </LocationDiv>
          <RegisterButton value="??????" type="submit" />
        </Form>
        { isSubmitting && <div>?????????????????????????????????</div>}
        { afterCreatedGuide && !isSubmitting && <AfterCreated>
          <span>{afterCreatedGuide}</span> { afterCreatedUrl && <Link to={afterCreatedUrl}>????????????</Link>}
        </AfterCreated> }
      </>
    );
};
