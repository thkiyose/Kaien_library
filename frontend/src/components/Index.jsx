import React, { useState, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Wrapper } from './parts/Wrapper';
import styled from "styled-components";
import Color from './parts/Color';
import { fetchBooks } from '../lib/api/book';
import { search } from '../lib/api/book';

const BookList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: flex-start;
`
const ImageWrap = styled.li`
  width: 100px;
  margin: 0px 10px;
  position: relative;
`

const Image = styled.img`
  border: solid 2px gray;
  width: 100px;
  height: 140px;
`
const BookTitle = styled.p`
  margin: 0px 0px 5px 0px;
  width: 100%;
  font-size: 0.7rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const FigCaption = styled.figcaption`
  background: rgba(0, 0, 0, .7);
  bottom: 0;
  color: #fff;
  display: flex;
  height: auto;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  border: solid 2px black;
  width: 100px;
  height: 140px;
  :hover {
    opacity: 1;
  }
`
const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: ${Color.primary};
    color: white;
    border-color: transparent;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`
const NotFound = styled.div`
  background-color: ${Color.text};
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`

export const Index = () => {
  const { register, setValue, getValues, reset } = useForm();
  const [ books, setBooks ] = useState({});
  const [ perPage ] = useState(18);
  const [ start, setStart ] = useState(0);
  const navigate = useNavigate();

  const handleFetchBooks= async() => {
    const res = await fetchBooks();
    setBooks(res.data.books);
  }
  useLayoutEffect(() => { handleFetchBooks() }, []);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  const handleSearch = async(params) => {
    const searchParam = getValues("search");
    const res = await search({q:searchParam});
    setBooks(res.data.books);
    reset({search:""});
  };

  return(
    <>
      <Wrapper width={"800px"}>
        <div>
          <input type="text" name="search" {...register("search")}/>
          <button onClick={() => {handleSearch()}}>検索</button><button onClick={() => {handleSearch("")}}>リセット</button>
        </div>
        {books.length > 1 &&
          <BookList>
            {Object.keys(books).slice(start, start + perPage).map((key) => {
              return (
                <React.Fragment key={books[key].id}>
                  <ImageWrap key={books[key].id}>
                    <Link to={`${books[key].id}`} >
                      {books[key].imageUrl ? <Image src={`http://localhost:3000/${books[key].id}.jpg`} /> : <Image src={`${process.env.PUBLIC_URL}/noimage.png`} />}
                      <BookTitle>{books[key].title}</BookTitle>
                      <FigCaption>
                        {books[key].title}
                      </FigCaption>
                    </Link>
                  </ImageWrap>
                </React.Fragment>
              );
            })}
          </BookList>}
          {books.length === 0 && <NotFound><p>書籍が見つかりませんでした。</p></NotFound>}
        <MyPaginate
          onPageChange={handlePageChange}
          pageCount={Math.ceil(books.length / perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName='pagination'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          activeClassName='active'
          previousLabel='<'
          nextLabel='>'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          disabledClassName='disabled'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
        />
      </Wrapper>
    </>
  );
};
