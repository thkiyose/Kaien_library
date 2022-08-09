import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../../App';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { Modal } from '../parts/Modal';
import { deleteBook } from '../../lib/api/admin';
import { fetchBooksAdmin } from '../../lib/api/admin';
import { searchBooks } from '../../lib/api/admin';

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.3rem;
`

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
const SearchForm = styled.input`
  outline: 0;
  background: white;
  border: 0;
  margin: 0 0 10px;
  padding: 5px;
  font-size: 0.8rem;
  width: 40%;
`
const SearchCategory = styled.select`
  outline: 0;
  font-size: 0.8rem;
  background: white;
  border: 0;
  padding: 5px;
  margin-right: 10px;
}
`
const SearchButton = styled.button`
  padding: 5px;
  font-size: 0.8rem;
  background-color: ${Color.primary};
  border: 0;
  outline: 0;
  color: white;
  margin: 0px 5px;
  cursor: pointer;
`
const ResetButton = styled.button`
  padding: 5px;
  font-size: 0.8rem;
  background-color: ${Color.dark};
  border: 0;
  outline: 0;
  color: white;
  margin-left: 50px;
  cursor: pointer;
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
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const { categories } = useContext(Context);
  const searchRef = useRef();
  const categoryRef = useRef();
  const [ searchParam, setSearchParam ] = useState("");
  const [ searchCategory, setSearchCategory ] = useState("");
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    setCurrentPage(e.selected)
  }

  const handleFetchBooks= async() => {
    const res = await fetchBooksAdmin();
    setBooks(res.data.books);
  }
  useEffect(() => { handleFetchBooks() }, []);

  const handleDeleteBook = async(book_id) => {
    await deleteBook(book_id);
    handleFetchBooks();
  };

  const handleChangeSearchParam = (e) => {
    setSearchParam(e.target.value);
  };

  const handleChangeCategory = async(e) => {
    setSearchCategory(e.target.value);
  };

  const handleSearch = async(e) => {
    const res = await searchBooks(searchParam,searchCategory);
    setBooks(res.data.books);
    setStart(0);
    setCurrentPage(0);
  };

  const handleResetSearch = async() => {
    const res = await searchBooks();
    setBooks(res.data.books);
    setSearchParam("");
    setSearchCategory("");
    searchRef.current.value = "";
    categoryRef.current.value= "カテゴリを選択";
    setStart(0);
    setCurrentPage(0);
  };

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const canDelete = (isLent,isReserved,bookId) => {
    if (isLent === true) {
      return <p>貸出中</p>
    } else if (isReserved === true) {
      return <p>予約済み</p>
    } else {
      return <DeleteButton onClick={() => handleShowModal(bookId)}>削除</DeleteButton>
    }
  };

  return(
    <>
      <Title>書籍データ一覧</Title>
      <div>
        <SearchCategory name="category" ref={categoryRef} onChange={(e)=>{handleChangeCategory(e)}}>
          <option hidden>カテゴリを選択</option>
            {Object.keys(categories).map((key) => {
              return (
                <option key={key} value={categories[key].id}>{categories[key].category}</option>
              );
            })}
        </SearchCategory>
        <SearchForm type="text" ref={searchRef} name="search" placeholder="フリーワード検索" onChange={(e)=>{handleChangeSearchParam(e)}}/>
        <SearchButton onClick={(e) => {handleSearch(e)}}>検索</SearchButton><ResetButton onClick={() => {handleResetSearch()}}>リセット</ResetButton>
      </div>
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
        forcePage={currentPage}
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
      <Modal showFlag={showModal} setShowModal={setShowModal} yesAction={()=>handleDeleteBook(targetId)} message={"書籍を削除してよろしいですか？"}/>
    </>
  );
};
