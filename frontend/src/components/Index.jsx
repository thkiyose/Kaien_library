import React, { useState, useLayoutEffect, useContext, useRef } from 'react';
import { Context } from '../App';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Wrapper } from './parts/Wrapper';
import styled from "styled-components";
import Color from './parts/Color';
import { fetchBooks } from '../lib/api/book';
import { search } from '../lib/api/book';
import { fetchWatchingBooks } from '../lib/api/watchlist';

const SearchBar = styled.div`
  padding-bottom: 5px;
  margin-left: 70px;
`
const Watch = styled.div`
  input{
    width: 60px;
    border-radius: 50px;
    height :50px;
  }
  p {
    width: 60px;
    font-size: 0.3rem;
    padding :0;
    margin: 0;
    text-align: center;
    color: ${Color.primary}
  }
  width: 60px;
  margin: 0;
  float: left;
  input:hover {
  background-color: ${Color.text};
  transition-duration: 0.3s;
`

const SearchForm = styled.input`
  outline: 0;
  background: white;
  border: 0;
  margin: 0 0 10px;
  padding: 10px;
  font-size: 0.8rem;
  width: 40%;
`
const SearchCategory = styled.select`
  outline: 0;
  font-size: 0.8rem;
  background: white;
  border: 0;
  padding: 9px;
  margin-right: 10px;
}
`
const SearchButton = styled.button`
  padding: 10px;
  font-size: 0.8rem;
  background-color: ${Color.primary};
  border: 0;
  outline: 0;
  color: white;
  margin: 0px 5px;
  cursor: pointer;
`
const ResetButton = styled.button`
  padding: 10px;
  font-size: 0.8rem;
  background-color: ${Color.dark};
  border: 0;
  outline: 0;
  color: white;
  margin-left: 50px;
  cursor: pointer;
`

const BookList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0;
  padding: 0;
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
  font-size: 0.9rem;
  overflow: hidden;
  :hover {
    opacity: 1;
  }
`
const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  margin: 0;
  margin-left: 60px;
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
  margin-left: 70px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`

export const Index = () => {
  const [ books, setBooks ] = useState({});
  const [ searchParam, setSearchParam ] = useState({});
  const [ searchCategory, setSearchCategory ] = useState({});
  const [ perPage ] = useState(18);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ start, setStart ] = useState(0);
  const { currentUser, setLoading } = useContext(Context);
  const { categories } = useContext(Context);
  const searchRef = useRef();
  const categoryRef = useRef();
  const [ toggleFlag, setToggleFlag ] = useState(false);

  const handleFetchBooks= async() => {
    const res = await fetchBooks();
    setBooks(res.data.books);
  };
  useLayoutEffect(() => { setLoading(true);
    handleFetchBooks();
    setLoading(false); }, [setLoading]);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    setCurrentPage(e.selected)
  };

  const handleChangeSearchParam = (e) => {
    setSearchParam(e.target.value);
  };

  const handleChangeCategory = async(e) => {
    setSearchCategory(e.target.value);
  };

  const handleSearch = async(e) => {
    const res = await search({q:searchParam,category:searchCategory});
    setBooks(res.data.books);
    setStart(0);
    setCurrentPage(0);
    setToggleFlag(false);
  };

  const handleResetSearch = async() => {
    const res = await search();
    setBooks(res.data.books);
    setSearchParam("");
    setSearchCategory("");
    searchRef.current.value = "";
    categoryRef.current.value= "カテゴリを選択";
    setStart(0);
    setCurrentPage(0);
    setToggleFlag(false);
  };

  const showWatchList = async() => {
    const res = await fetchWatchingBooks(currentUser.id, toggleFlag);
    setBooks(res.data.books);
    setSearchParam("");
    setSearchCategory("");
    searchRef.current.value = "";
    categoryRef.current.value= "カテゴリを選択";
    setStart(0);
    setCurrentPage(0);
    setToggleFlag(!toggleFlag)
  }

  return(
    <>
      <Wrapper width={"800px"} minHeight={"580px"}>
        <SearchBar>
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
        </SearchBar>
        {toggleFlag ? <Watch><input alt="backToIndex" type="image" src={`${process.env.PUBLIC_URL}/home.png`} onClick={()=>{showWatchList()}} /><p>一覧に戻る</p></Watch> : <Watch><input alt="showWatchList" type="image" src={`${process.env.PUBLIC_URL}/watchlist.png`} onClick={()=>{showWatchList()}} /><p>ウォッチ</p><p>リスト</p></Watch>}
        {books.length >= 1 &&
          <BookList>
            {Object.keys(books).slice(start, start + perPage).map((key) => {
              return (
                <React.Fragment key={books[key].id}>
                  <ImageWrap key={books[key].id}>
                    <Link to={`${books[key].id}`}>
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
      </Wrapper>
    </>
  );
};
