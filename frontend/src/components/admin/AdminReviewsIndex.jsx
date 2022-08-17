import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { Modal } from '../parts/Modal';
import { fetchReviewsAdmin } from '../../lib/api/admin';
import { deleteReview } from '../../lib/api/admin';

export const AdminReviewsIndex = () => {
  const [ reviews, setReviews ] = useState([]);
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ pageCount, setPageCount] = useState(0);
  const [ searchParam, setSearchParam ] = useState({
    userId: "",
    userName:"",
    userEmail:"",
    bookTitle:"",
    comment:"",
    rating:["",""]
  });

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    const hiddens = Array.from(document.getElementsByClassName("show"));
    const buttons = Array.from(document.getElementsByClassName("detailButton"));
    hiddens.map((element)=>{
      element.classList.remove("show");
      element.classList.add("hidden");
      return element
    })
    buttons.map((element)=>{
      element.innerText = "＋";
      return element
    })
  }

  const handleFetchReviews = useCallback(async() => {
    const res = await fetchReviewsAdmin();
    setReviews(res.data.reviews);
    setPageCount(Math.ceil(res.data.reviews.length/perPage));
  },[perPage])
  useEffect(() => { handleFetchReviews() }, [handleFetchReviews]);

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const handleDeleteReview = async(reviewId) => {
    const res = await deleteReview(reviewId);
    if (res.data.status === "SUCCESS") {
      handleFetchReviews();
    }
  }

  const onChange = (param,type) => {
    if (type === "userId"){
      setSearchParam({...searchParam,userId:param})
    } else if (type === "userName") {
      setSearchParam({...searchParam,userName:param})
    } else if (type === "userEmail") {
      setSearchParam({...searchParam,userEmail:param})
    } else if (type === "bookTitle") {
      setSearchParam({...searchParam,bookTitle:param})
    } else if (type === "comment") {
      setSearchParam({...searchParam,comment:param})
    } else if (type === "ratingStart") {
      setSearchParam({...searchParam,rating:[param, searchParam.rating[1]]})
    } else if (type === "ratingEnd") {
      setSearchParam({...searchParam,rating:[searchParam.rating[0],param]})
    }
  }

  const handleSearch = async(params) => {
    const res =[];
    setPageCount(Math.ceil(res.data.reservations.length/perPage))
    setStart(0);
  };

  const handleResetSearch = () => {
    setSearchParam({userId: "",title:"",userName: "",userEmail: "",startDate:["",""],expiryDate:["",""],showExpired:searchParam.showExpired})
    handleSearch({userId: "",title:"",userName: "",userEmail: "",startDate:["",""],expiryDate:["",""],showExpired:searchParam.showExpired});
  };

const onClick = (e,id) => {
  const target = document.getElementById(`row_${id}`)
  if (e.target.innerHTML === "＋") {
    target.classList.remove('hidden');
    target.classList.add('show');
    e.target.innerHTML = "ー";
  } else if (e.target.innerHTML === "ー") {
    target.classList.remove('show');
    target.classList.add('hidden');
    e.target.innerHTML = "＋";
  }
}
  return(
    <>
      <Title>レビューデータ一覧</Title>
      <ReviewSearch>
        <p>
          書籍タイトル<input type="text" value={searchParam.bookTitle} className="bookTitle" onChange={(e)=>{onChange(e.target.value,"bookTitle")}}/>
          ユーザーID<input type="text" value={searchParam.userId} className="userId" onChange={(e)=>{onChange(e.target.value,"userId")}}/>
          ユーザー名<input type="text" value={searchParam.userName} className="userName" onChange={(e)=>{onChange(e.target.value,"userName")}}/>
          ユーザーemail<input type="text" value={searchParam.userEmail} className="userEmail" onChange={(e)=>{onChange(e.target.value,"userEmail")}}/>
        </p>
        <p>
          レビュー本文<input type="text" value={searchParam.comment} className="comment" onChange={(e)=>{onChange(e.target.value,"comment")}}/>
          評価<select value={searchParam.rating[0]} className="rating" onChange={(e)=>{onChange(e.target.value,"ratingStart")}}>
            <option hidden></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>~
          <select value={searchParam.rating[1]} className="rating" onChange={(e)=>{onChange(e.target.value,"ratingEnd")}}>
            <option hidden></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button className="searchButton" onClick={()=>{handleSearch(searchParam)}}>検索</button><button className="resetButton" onClick={()=>{handleResetSearch()}}>リセット</button>
        </p>
      </ReviewSearch>
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>レビュー対象タイトル</th><th>詳細表示</th><th>ﾕｰｻﾞｰid</th><th></th>
          </Row>
          {reviews.slice(start, start + perPage).map((review,index) => {
            return (
              <React.Fragment key={index}>
                <Row className={index % 2 === 0 ? "even": "odd"}>
                  <td className="id">{review.id}</td>
                  <td className="title"><Link to={`/books/${review.bookId}`}>{review.title}</Link></td>
                  <td className="detailButton" onClick={(e)=>{onClick(e,index)}}>＋</td>
                  <td className="userName">{review.userId ? review.userId : "退会済"}</td>
                  <td className="control"><DeleteButton onClick={() => {handleShowModal(review.id)}}>削除</DeleteButton></td>
                </Row>
                <DetailRow id={`row_${index}`} className="hidden">
                  <td colSpan="2"><p>評価:{review.rating}</p>{review.comment}</td><td colSpan="3"><p>ユーザー:</p><p>{review.name}</p><p></p>{review.email}</td>
                </DetailRow>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
      <MyPaginate
        onPageChange={handlePageChange}
        pageCount={pageCount}
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
      <Modal showFlag={showModal} setShowModal={setShowModal} yesAction={()=>handleDeleteReview(targetId)} message={"レビューデータを削除してよろしいですか？"}/>
    </>
  );
};

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.3rem;
  display: inline;
`

const ReviewSearch = styled.div`
  font-size: 0.8rem;
  p {
    margin: 0;
  }
  input {
    outline: 0;
    background: white;
    border: 0;
    margin: 0 0 10px;
    padding: 5px;
    font-size: 0.8rem;
    margin-right: 5px;
  }
  select {
    outline: 0;
    background: white;
    border: 0;
    margin: 0 0 10px;
    padding: 5px;
    font-size: 0.8rem;
    margin-right: 5px;
  }
  button {
    outline: 0;
    font-size: 0.8rem;
    border: 0;
    padding: 5px 5px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .searchButton {
    background-color: ${Color.primary};
    padding: 5px 10px;
  }
  .resetButton {
    background-color: ${Color.dark};
    float:right;
  }
  .userId {
    width: 25px;
  }
  .userName {
    width: 70px;
  }
  .comment {
    width: 300px;
  }
`

const Table = styled.table`
  border: none;
  border-collapse: collapse;
  width: 100%;
  .hidden {
    display: none;
  }
  .odd {
    background-color: #c2dbcf;
  }
`
const Row = styled.tr`
  th {
    font-weight: normal;
    background-color: ${Color.primary};
    color: white;
    font-size: 0.9rem;
    text-align: center;
  }
  td {
    font-size: 0.9rem;
    border: none;
  }
  .title {
    width:60%;
  }
  .control {
    width: 6%;
  }
  .id {
    width: 5%;
    text-align: center;
  }
  .userName {
    width:6%;
    text-align: center;
  }
  .detailButton {
    cursor: pointer;
    width: 7%;
    text-align:center;
  }
  p {
    margin: 0;
    padding-left: 12px;
    color: rgb(85, 85, 85);
  }
`

const DetailRow = styled.tr`
  background-color: white;
  font-size: 0.9rem;
  p {
    margin:0;
    padding:0;
  }
  td {
    padding: 10px;
  }
  .label {
    background-color:${Color.primary};
    color: white;
    text-align: center;
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
