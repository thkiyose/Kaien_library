import React from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import Color from './Color';
import styled from "styled-components";

export const ReviewDisplay = (props) => {
  const { userName, rating, comment } = props
  return (
    <div>
      <p>{userName}</p>
      <p>{rating}</p>
      <p>{comment}</p>
    </div>
  );
};
