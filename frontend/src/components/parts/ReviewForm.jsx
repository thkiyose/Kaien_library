import React from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
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

export const ReviewForm = () => {
  const { register, handleSubmit } = useForm();

  const onChange = (value) => {
    console.log(`React Stars Rating value is ${value}`);
  };

  const ReactStarsExample = ({ value }) => {
  return <ReactStarsRating onChange={onChange} value={value} size={40} secondaryColor={`${Color.dark}`} starGap={10} />;
};
  return (
    <>
      <form onSubmit={handleSubmit(async(data) => {
        try {
          const res = await createReview(data);
          if (res.data.status === 'SUCCESS') {
            console.log(res);
          }
        } catch (e) {
          console.log(e);
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
          </tbody>
        </FormTable>
      </form>
    </>
  )
}
