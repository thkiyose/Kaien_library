import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Color from './parts/Color';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wrapper } from './parts/Wrapper';
import { ReviewForm } from './parts/ReviewForm';

const ThankYou = styled.div`
  text-align: center;
  font-size: 3rem;
  letter-spacing: 1rem;
  color: ${Color.primary};
  text-shadow: 7px 0px 0px ${Color.primary};
  p {
    margin: 0;
  }
`
const Message = styled.p`
  text-align: center;
  padding: 20px;
  font-weight: lighter;
`
const Button = styled.button`
   width: 100%;
   padding: 20px;
   background-color: ${Color.primary};
   color : white;
   border: none;
   font-size: 1rem;
   cursor: pointer;
`
const ReviewGuide = styled.div`
  margin-top: 20px;
  border-top: solid 1px ${Color.text};
  button {
    background-color: rgb(0,0,0,0);
    border: 0;
    font-size: 1.1rem;
    text-decoration: underline;
    cursor: pointer;
  }
  p {
    text-align: center;
  }
`
const Title = styled.p`
  background-color: ${Color.text};
  padding: 5px;
  text-align: center;
`

export const ThankYouForReturn= () => {
  const location = useLocation();
  const { bookReturned } = location.state;
  const { alreadyReviewed } = location.state;
  const { title } = location.state;
  const { bookId } = location.state;
  const navigate = useNavigate();
  const [ showForm, setShowForm] = useState(false);

  const AvoidInvalidAccess = () => {
    if (!bookReturned) {
      navigate("/mypage/lendings");
    }
  }

  useEffect(() => {AvoidInvalidAccess()});

  const handleShowForm = () => {
    setShowForm(true);
  }

  return (
    <>
      <Wrapper width="600px">
        <ThankYou>
          <p>THANK</p>
          <p>YOU!</p>
        </ThankYou>
        <Message>ご利用ありがとうございました。</Message>
        <Button onClick={() => {navigate("/mypage/lendings")}}>マイページに戻る</Button>
        {!alreadyReviewed &&
        <ReviewGuide>
          <p>いかがでしたか？あなたの感想を是非お寄せ下さい！{ !showForm && <button onClick={()=>{handleShowForm()}}>レビューを書く</button> }</p>
          { showForm && <Title>{title}</Title> }
          <ReviewForm
            bookId={bookId}
            showFlag={showForm}
            setShowFlag={setShowForm}
            action={"create"}
            navigateTo={`/books/${bookId}`}
            />
        </ReviewGuide>}
      </Wrapper>
    </>
  );
};
