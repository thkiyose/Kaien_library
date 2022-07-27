import React, { useState, useContext } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Context } from '../../App';
import Color from './Color';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { createReview } from '../../lib/api/review';

const FormTable = styled.table`
  td {
    font-size: 0.9rem;
  }
  input[type="submit"] {
    padding: 7px;
    background-color: ${Color.primary};
    border: 0;
    outline: 0;
    color: white;
    cursor: pointer;
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

export const ReviewForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [ rating, setRating ] = useState(null);
  const [ error, setError ] = useState("");
  const { currentUser } = useContext(Context);
  const { bookId } = props;

  const onChange = (value) => {
    setRating(value);
  };

  const ReactStarsExample = ({ value }) => {
  return <ReactStarsRating onChange={onChange} value={rating} size={40} secondaryColor={`${Color.dark}`} starGap={10} />;
};
  return (
    <>
      <form onSubmit={handleSubmit(async(data) => {
        try {
          const res = await createReview({user_id: currentUser.id, book_id: bookId, rating: rating,comment:data.comment});
          if (res.data.status === 'SUCCESS') {
            console.log(res);
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
              <td><ReactStarsExample/></td>
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
              <td>{error}</td>
            </tr>
          </tbody>
        </FormTable>
      </form>
    </>
  )
}
