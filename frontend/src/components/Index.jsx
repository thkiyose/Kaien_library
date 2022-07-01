import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Wrapper } from './parts/Wrapper';
import styled from "styled-components";
import Color from './parts/Color';
import { fetchBooks } from '../lib/api/book';

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

export const Index = () => {
  const [ books, setBooks ] = useState({});
  const [ perPage ] = useState(18);
  const [ start, setStart ] = useState(0);

  const handleFetchBooks= async() => {
    const res = await fetchBooks();
    setBooks(res.data.books);
  }
  useEffect(() => { handleFetchBooks() }, []);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  return(
    <>
      <Wrapper width={"800px"}>
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
        </BookList>
        <MyPaginate
          onPageChange={handlePageChange}
          pageCount={Math.ceil(books.length / perPage)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
          marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
          pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
          containerClassName='pagination' //ページネーションリンクの親要素のクラス名
          pageClassName='page-item' //各子要素(li要素)のクラス名
          pageLinkClassName='page-link' //ページネーションのリンクのクラス名
          activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます
          previousLabel='<' //前のページ番号に戻すリンクのテキスト
          nextLabel='>' //次のページに進むボタンのテキスト
          previousClassName='page-item' // '<'の親要素(li)のクラス名
          nextClassName='page-item' //'>'の親要素(li)のクラス名
          previousLinkClassName='page-link'  //'<'のリンクのクラス名
          nextLinkClassName='page-link'　//'>'のリンクのクラス名
          disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
          breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
          breakClassName='page-item' // 上記の「…」のクラス名
          breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
        />
      </Wrapper>
    </>
  );
};
