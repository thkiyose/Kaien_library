import React, { useState, useEffect } from 'react';
import { Wrapper } from './parts/Wrapper';
import styled from "styled-components";
import { fetchBooks } from '../lib/api/book';

const BookList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: flex-start;
`

const Image = styled.img`
  border: solid 2px gray;
  width: 100px;
  height: 140px;
  margin: 10px 8px;
`

export const Index = () => {
  const [ books, setBooks ] = useState({});

  const handleFetchBooks= async() => {
    const res = await fetchBooks();
    setBooks(res.data);
  }
  useEffect(() => { handleFetchBooks() }, []);

  return(
    <>
      <Wrapper width={"800px"}>
        <BookList>
          {Object.keys(books).map((key) => {
            return (
              <li key={key}>{books[key].imageUrl.url ? <Image src={books[key].imageUrl.url} /> : <Image src={`${process.env.PUBLIC_URL}/noimage.png`} />}</li>
            );
          })}
        </BookList>
      </Wrapper>
    </>
  );
};
