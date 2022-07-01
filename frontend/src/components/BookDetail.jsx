import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Context } from '../App';
import { Wrapper } from './parts/Wrapper';
import { useParams } from 'react-router-dom';
import { showBook } from '../lib/api/book';

const Top = styled.div`
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
  background-color: #bde6cf;
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
  const { categories, locations } = useContext(Context);
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
