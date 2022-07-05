import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Wrapper } from './parts/Wrapper';
import Color from './parts/Color';
import { useParams } from 'react-router-dom';
import { showBook } from '../lib/api/book';

const Top = styled.div`
`

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
`

const ImageDiv = styled.div`
  float: left;
  margin: 10px 60px;
`
const Image = styled.img`
  border: solid 2px gray;
  width: 130px;
`
const InfoDiv = styled.div`
  margin: 10px 20px;
  text-align :center;
  h1 {
    text-align: center;
    font-size: 1.5rem;
  }
  span {
    margin: 0px 20px;
  }
`
const InfoDivBottom = styled.div`
  margin-top: 30px;
`

const Rent = styled.button`
  padding: 30px;
  float: left;
  width: 30%;
  margin: 0px 20px ;
`
const Description = styled.div`
  margin: 20px auto;
  background-color:${Color.text};
  padding: 20px;
`

const ClearFix = styled.div`
  content: "";
  display: block;
  clear: both;
`

export const BookDetail = () => {
  const [ book, setBook ] = useState({});
  const [ category, setCategory ] = useState({});
  const [ location, setLocation ] = useState({});
  const navigate = useNavigate();
  const bookId = useParams();

  const handleShowBook = async(bookId) => {
    try {
     const res = await showBook(bookId);
     setBook(res.data.book);
     setCategory(res.data.category)
     setLocation(res.data.location)
    } catch(e) {
     console.log(e);
    }
    };

  useEffect(() => {
   handleShowBook(bookId.id);
  }, [bookId]);

  return(
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <p>カテゴリー>{category.category}</p>
        <Top>
          <ImageDiv>
            {book.imageUrl ? <Image src={`http://localhost:3000/${book.id}.jpg`} /> : <Image src={`${process.env.PUBLIC_URL}/noimage.png`} />}
            <Link to="">★</Link>
          </ImageDiv>
          <InfoDiv>
            <h1>{book.title}</h1>
            <p><span>著者名: {book.author}</span><span>出版年: {book.publishedYear}</span></p>
            <InfoDivBottom>
              <Rent>この本を借りる</Rent>
              <p><span>ステータス: 貸出可</span></p>
              <p><span>場所: {location.location}</span></p>
            </InfoDivBottom>
          </InfoDiv>
          <ClearFix />
          <Description>{book.description}</Description>
        </Top>
      </Wrapper>
    </>
  );
};