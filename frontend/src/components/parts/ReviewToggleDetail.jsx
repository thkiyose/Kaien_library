import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const ReviewToggleDetail = forwardRef((props,ref) => {
  const { review, handleShowModal } = props;
  const [ showDetail, setShowDetail ] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  useImperativeHandle(ref, () => ({
    setShowDetailFalse() {
      setShowDetail(false)
    }
  }));

  return (
    <>
      <Row>
        <td className="id">{review.id}</td>
        <td className="title"><Link to={`/books/${review.bookId}`}>{review.title}</Link></td>
        <td className="detailButton" onClick={()=>{handleShowDetail()}}>{showDetail ? "ー" : "＋"}</td>
        <td className="userName">{review.userId ? review.userId : "退会済"}</td>
        <td className="control"><button onClick={() => {handleShowModal(review.id)}}>削除</button></td>
      </Row>
      {showDetail === true &&
        <DetailRow>
          <td></td><td>{review.comment}</td>
        </DetailRow>
      }
    </>
  );
})

const Row = styled.tr`
  th {
    font-weight: normal;
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

const DetailRow = styled.tr`
  background-color: white;
  font-size: 0.8rem;
`
