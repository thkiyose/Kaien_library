import React from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import Color from './Color';

export const ReviewForm = () => {
  const onChange = (value) => {
    console.log(`React Stars Rating value is ${value}`);
  };

  const ReactStarsExample = ({ value }) => {
  return <ReactStarsRating onChange={onChange} value={value} size="40" secondaryColor={`${Color.dark}`} />;
};

  return (
    <>
      <ReactStarsExample/>
    </>
  )
}
