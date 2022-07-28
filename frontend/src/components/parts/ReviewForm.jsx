import React, { useState, useContext } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { createReview } from '../../lib/api/review';
import { showReviews } from '../../lib/api/review';

const FormTable = styled.table`
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
    text-decoration: underline;
  }
`

export const ReviewForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [ rating, setRating ] = useState(0);
  const [ error, setError ] = useState("");
  const { currentUser } = useContext(Context);
  const { bookId, showFlag, setShowFlag, setReviews, setAlreadyReviewed } = props;

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
            const res = await createReview({user_id: currentUser.id, book_id: bookId, rating: rating,comment:data.comment});
            if (res.data.status === 'SUCCESS') {
              const res = await showReviews(bookId,currentUser.id);
              setReviews(res.data.reviews)
              setAlreadyReviewed(res.data.alreadyReviewed)
              setShowFlag(false);
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
                <td><input type="submit" value="レビューを投稿する"/></td>
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
