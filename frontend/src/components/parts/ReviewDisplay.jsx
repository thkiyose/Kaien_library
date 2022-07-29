import React from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import Color from './Color';
import styled from "styled-components";

const Display = styled.table`
  background-color: ${Color.secondary};
  margin: 30px auto !important;
  width: 80%;
`
const DataRow = styled.tr`
  background-color: ${Color.primary};
  color: white;
  td {
    padding: 5px 10px !important;
  }
  td:nth-of-type(2) {
    text-align: right;
  }
`
const CommentRow = styled.tr`
  td {
    padding: 3px !important;
  }
`

const Data = styled.td`
  vertical-align: middle;
  width: 50%;
`

export const ReviewDisplay = (props) => {
  const { userName, rating, comment, createdAt } = props;

  const ReactStarsReview = ({ value }) => {
    return <ReactStarsRating id={"review"} value={rating} isEdit={false} size={20} Half={false} />;
  };

  return (
    <Display>
      <tbody>
        <DataRow><Data>{userName}</Data><Data>{createdAt.slice(0,10)}</Data></DataRow>
        <CommentRow><td><ReactStarsReview/></td></CommentRow>
        <CommentRow><td colSpan="2">{comment}</td></CommentRow>
      </tbody>
    </Display>
  );
};
