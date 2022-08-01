import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";
import { Modal } from './Modal';
import { ReviewForm } from './ReviewForm'

const Display = styled.table`
  background-color:white;
  margin: 0px auto  20px auto !important;
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
`
const DataRow = styled.tr`
  background-color: ${Color.primary};
  color: white;
  td {
    padding: 0px 10px !important;
  }
  td:nth-of-type(2) {
    text-align: right;
  }
`
const CommentRow = styled.tr`
  td {
    padding: 3px 10px !important;
    font-size: 0.9rem;
  }
  .yourreview {
    text-align: right;
    span {
      background-color: ${Color.light};
      color: white;
      padding: 3px;
      border-radius: 10px;
    }
  }
`
const Title = styled.p`
  font-size: 0.9rem;
  margin:0 auto;
  padding:0;
  width: 80%;
`
const EditRow = styled(CommentRow)`
  text-align: right;
  td button {
    margin-left: 10px;
    background-color: rgb(0,0,0,0);
    border: none;
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;
  }
`
const Data = styled.td`
  vertical-align: middle;
  width: 50%;
`
const Icon = styled.img`
  height: 1rem;
`
const FormDiv = styled.div`
  margin:0 auto;
  text-align: center;
`

export const ReviewDisplay = (props) => {
  const { userId, userName, rating, comment, createdAt, title, bookId, reviewId, isEdit, submitMessage } = props;
  const { currentUser } = useContext(Context);
  const [ showModal, setShowModal] = useState(false);
  const [ showForm, setShowForm] = useState(false);
  const [ deleteTarget, setDeleteTarget ] = useState(0);

  const handleShowModal = (reviewId) => {
    setShowModal(true);
    setDeleteTarget(reviewId);
  }

  const handleShowForm = () => {
    setShowForm(true);
  }

  const ReactStarsReview = ({ value }) => {
    return <ReactStarsRating id={"review"} value={rating} isEdit={false} size={20} Half={false} />;
  };

  return (
    <>
      { title && <Title><Link to={`/books/${bookId}`}>{title}</Link></Title>}
      {!showForm &&
        <Display>
          <tbody>
            <DataRow><Data>投稿者:{userName}</Data><Data>{createdAt.slice(0,10)}</Data></DataRow>
            <CommentRow><td><ReactStarsReview/></td>{userId === currentUser.id && <td className="yourreview"><span>あなたのレビュー</span></td>}</CommentRow>
            <CommentRow><td colSpan="2">{comment}</td></CommentRow>
            { isEdit && <EditRow><td colSpan="3"><button onClick={()=>{handleShowForm()}}><Icon src={`${process.env.PUBLIC_URL}/edit.png`} />編集</button><button onClick={() =>{handleShowModal(reviewId)}}><Icon src={`${process.env.PUBLIC_URL}/delete.png`} />削除</button></td></EditRow>}
          </tbody>
        </Display> }
      <Modal showFlag={showModal} setShowModal={setShowModal} message={"本当にレビューを削除しますか？"} yesAction={()=>{props.handleDeleteReview(deleteTarget)}} />
      <FormDiv>
        <ReviewForm showFlag={showForm} setShowFlag={setShowForm} initialComment={comment} initialRating={rating} submitMessage={"レビューを更新する"}/>
      </FormDiv>
    </>
  );
};
