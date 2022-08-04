import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { deleteBook } from '../../lib/api/book';
import { fetchBooksForAdmin } from '../../lib/api/book';

const DeleteButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 5px;
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
  th {
    font-weight: normal;
    background-color: ${Color.primary};
    color: white;
  }
  td {
    font-size: 0.9rem;
    border: none;
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 85%;
  }
  .control {
    width: 10%;
    text-align: center;
  }
  .id {
    text-align: center;
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

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  const handleFetchBooks= async() => {
    const res = await fetchBooksForAdmin();
    setBooks(res.data.books);
  }
  useEffect(() => { handleFetchBooks() }, []);

  const handleDeleteBook = async(book_id) => {
    await deleteBook(book_id);
    handleFetchBooks();
  };

  const canDelete = (isLent,isReserved,id) => {
    if (isLent === true) {
      return <p>貸出中</p>
    } else if (isReserved === true) {
      return <p>予約済み</p>
    } else {
      return <DeleteButton onClick={() => handleDeleteBook(id)}>削除</DeleteButton>
    }
  };


  return(
    <>
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>タイトル</th><th></th>
          </Row>
          {Object.keys(books).slice(start, start + perPage).map((key) => {
            return (
              <Row key={key}>
                <td className="id">{books[key].id}</td><td className="title"><Link to={`/books/${books[key].id}`}>{books[key].title}</Link></td><td className="control">{canDelete(books[key].isLent,books[key].isReserved,books[key].id)}</td>
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
    </>
  );
};
