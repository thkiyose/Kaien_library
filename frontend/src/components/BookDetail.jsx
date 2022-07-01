import React from 'react';
import { Wrapper } from './parts/Wrapper';
import { useParams } from 'react-router-dom'

export const BookDetail = () => {
  const Id = useParams();
  console.log(Id);
  return(
    <>
      <Wrapper width={"800px"}>
        <div>
          test
        </div>
      </Wrapper>
    </>
  );
};
