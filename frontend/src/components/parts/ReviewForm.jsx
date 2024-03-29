import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { createReview } from '../../lib/api/review';
import { updateReview } from '../../lib/api/review';
import { showReviews } from '../../lib/api/review';

const FormTable = styled.table`
  margin: 0 auto;
  td {
    font-size: 0.9rem;
    padding: 0;
  }
  span { cursor:pointer; }
  input[type="submit"] {
    padding: 7px;
    background-color: ${Color.primary};
    border: 0;
    outline: 0;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    :hover {
      background-color: #0c797a;
    }
  }
  textarea {
    resize: none;
    width: 500px;
    height: 200px;
    background: white;
    border: none;
    padding: 10px;
    margin: 0;
  }
`
const Error = styled.td`
  text-align: center;
  background-color: ${Color.warning};
`

const Close = styled.td`
  text-align: center;
  button {
    background-color: rgb(0,0,0,0);
    border: none;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: underline;
  }
`

export const ReviewForm = (props) => {
  const { register, handleSubmit, setValue } = useForm({shouldUnregister:false});
  const [ rating, setRating ] = useState(0);
  const navigate = useNavigate();
  const [ error, setError ] = useState("");
  const { currentUser } = useContext(Context);
  const { bookId, reviewId, showFlag, setShowFlag, setReviewsFunc, setAlreadyReviewed, setAverage, initialComment, initialRating, submitMessage, action, navigateTo } = props;

  const setInitialValue = useCallback((initialComment,initialRating)=>{
    setValue("comment",initialComment);
    setRating(initialRating);
  },[setValue]);

  useEffect(()=>{setInitialValue(initialComment,initialRating)},[setInitialValue,initialComment,initialRating]);

  const onChange = (value) => {
    setRating(value);
  };
  const ReactStarsForm = ({ value }) => {
  return <ReactStarsRating id={"form"} onChange={onChange} value={rating} size={40} secondaryColor={`${Color.dark}`} starGap={10} isHalf={false} />;
};
  return (
    <>
      {showFlag &&
        <form onSubmit={handleSubmit(async(data) => {
          try {
            if (rating === 0) {
              setError("評価を選択して下さい。")
              return;
            }
            if (action === "create") {
              const res = await createReview({user_id: currentUser.id, book_id: bookId, rating: rating,comment:data.comment});
              if (res.data.status === 'SUCCESS') {
                const res = await showReviews(bookId,currentUser.id);
                if (typeof(setReviewsFunc) === "function") { setReviewsFunc(res.data.reviews) }
                if (typeof(setAlreadyReviewed) === "function") { setAlreadyReviewed(res.data.alreadyReviewed) }
                if (typeof(setAverage) === "function") { setAverage(res.data.average) }
                setShowFlag(false);
                if (navigateTo) { navigate(navigateTo) }
              }
            } else if (action === "update") {
                const res = await updateReview(reviewId, {rating: rating, comment: data.comment});
                if (res.data.status === 'SUCCESS') {
                  setReviewsFunc();
                  setShowFlag(false);
                }
            }
          } catch (e) {
            console.log(e);
            setError("投稿に失敗しました。");
          }})}>
          <FormTable>
            <tbody>
              <tr>
                <td>評価</td>
              </tr>
              <tr>
                <td><ReactStarsForm/></td>
              </tr>
              <tr>
                <td>本の感想をお聞かせ下さい。（任意）</td>
              </tr>
              <tr>
                <td><textarea name="comment" {...register("comment")}/></td>
              </tr>
              <tr>
                {submitMessage ? <td><input type="submit" value={submitMessage}/></td> : <td><input type="submit" value="レビューを投稿する"/></td>}
              </tr>
              <tr>
                <Error>{error}</Error>
              </tr>
              <tr>
                <Close><button onClick={()=>{setShowFlag(false)}}>☓閉じる</button></Close>
              </tr>
            </tbody>
          </FormTable>
        </form>
      }
    </>
  );
}
