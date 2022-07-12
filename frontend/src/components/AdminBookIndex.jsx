import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Color from './parts/Color';
import ReactPaginate from 'react-paginate';
import { Wrapper } from './parts/Wrapper';
import { deleteBook } from '../lib/api/book';
import { fetchBooks } from '../lib/api/book';

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
`
const DeleteButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
  margin-left: 10px;
`
const Table = styled.table`
  margin-top: 10px;
  border: none;
  border-collapse: collapse;
  width: 100%;
`
const Row = styled.tr`
  td, th {
    padding: 5px;
    border: none;
  }
  :nth-child(odd) {
    background-color: #c2dbcf;
  }
  p {
    margin: 0;
    padding-left: 12px;
    color: rgb(85, 85, 85);
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

export const AdminBookIndex = () => {
  const [ books, setBooks ] = useState({});
  const [ perPage ] = useState(18);
  const [ start, setStart ] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  const handleFetchBooks= async() => {
    const res = await fetchBooks();
    setBooks(res.data.books);
  }
  useEffect(() => { handleFetchBooks() }, []);

  const handleDeleteBook = async(book_id) => {
    await deleteBook(book_id);
    handleFetchBooks();
  };


  return(
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <Table>
          <tbody>
            {Object.keys(books).slice(start, start + perPage).map((key) => {
              return (
                <Row key={key}>
                  <td><Link to={`/books/${books[key].id}`}>{books[key].title}</Link></td><td>{books[key].isLent === false ? <><DeleteButton onClick={() => handleDeleteBook(books[key].id)}>削除</DeleteButton></> :<p>貸出中</p>}</td>
                </Row>
              );
            })}
          </tbody>
        </Table>
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
