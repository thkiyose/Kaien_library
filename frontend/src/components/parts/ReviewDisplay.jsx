import React, { useContext } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";

const Display = styled.table`
  background-color:white;
  margin: 30px auto !important;
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
    padding: 3px !important;
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

const Data = styled.td`
  vertical-align: middle;
  width: 50%;
`

export const ReviewDisplay = (props) => {
  const { userId, userName, rating, comment, createdAt } = props;
  const { currentUser } = useContext(Context);

  const ReactStarsReview = ({ value }) => {
    return <ReactStarsRating id={"review"} value={rating} isEdit={false} size={20} Half={false} />;
  };

  return (
    <Display>
      <tbody>
        <DataRow><Data>投稿者:{userName}</Data><Data>{createdAt.slice(0,10)}</Data></DataRow>
        <CommentRow><td><ReactStarsReview/></td>{userId === currentUser.id && <td className="yourreview"><span>あなたのレビュー</span></td>}</CommentRow>
        <CommentRow><td colSpan="2">{comment}</td></CommentRow>
      </tbody>
    </Display>
  );
};
