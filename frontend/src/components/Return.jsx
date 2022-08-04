import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Wrapper } from './parts/Wrapper';
import styled from "styled-components";
import { Context } from '../App';
import Color from './parts/Color';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLending } from '../lib/api/lending';
import { returnBook } from '../lib/api/lending';

const Info = styled.table`
  margin: 0 auto;
`
const Guide = styled.div`
  text-align: center;
  background-color: ${Color.text};
  margin-top: 10px;
  padding: 20px;
  p {
    margin: 0;
  }
`
const Image = styled.img`
  border: solid 2px gray;
  width: 130px;
  display: block;
  margin: 0 auto;
  text-align: center;
`
const NotFoundExplanation = styled.p`
  font-size: 0.8rem;
  background-color: ${Color.text};
  padding: 20px;
  text-align: center;
`
const BackButton = styled.button`
  outline: 0;
  display:block;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
  margin-bottom:10px;
`
const ReturnButton = styled.button`
  padding: 20px;
  width: 100%;
  background-color: ${Color.primary};
  color : white;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  border-bottom:4px solid rgba(0,0,0,0.2);
  :hover {
    background-color: #0c797a;
  }
	}
`

export const Return = () => {
  const { currentUser } = useContext(Context);
  const location = useLocation();
  const bookId = location.state;
  const lendingId = useParams();
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ book, setBook ] = useState({});

  const handleFetchLending = useCallback(async(lendingId) => {
    const res = await fetchLending(lendingId);
    setBook(res.data);
    if ( currentUser.id !== res.data.userId ){
      navigate("/mypage");
    };
    setIsLoading(false);
  },[currentUser.id, navigate])
  useEffect(() => { handleFetchLending(lendingId.id)},[handleFetchLending,lendingId.id]);

  const handleReturnBook = async(lendingId,currentUserId) => {
    const res = await returnBook(lendingId,currentUserId)
    if (res.data.status === "SUCCESS") {
      navigate("/thankyouforreturn", {state: { bookReturned: true, alreadyReviewed: book.alreadyReviewed, title: book.book.title}})
    }
  };

  if (isLoading === false){
    return (
      <>
        <Wrapper width="800px">
          <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
          {bookId ?
            <>
              {book.book.imageUrl ? <Image src={`http://localhost:3000/${book.book.id}.jpg`} /> : <Image src={`${process.env.PUBLIC_URL}/noimage.png`} />}
              <Info>
                <tbody>
                  <tr>
                    <th>返却対象:</th><td>{book.book.title}</td>
                  </tr>
                  <tr>
                    <th>返却場所:</th><td>{book.location}</td>
                  </tr>
                </tbody>
              </Info>
              <Guide>
                <p>書籍を返却場所に戻したことを必ず確認し、</p>
                <p>返却ボタンを押して下さい。</p>
              </Guide>
              <ReturnButton onClick={()=>{handleReturnBook(lendingId.id,currentUser.id)}}>返却する</ReturnButton>
            </> : <NotFoundExplanation>書籍の情報が見つかりません。マイページから返却操作を行って下さい。</NotFoundExplanation>}
        </Wrapper>
      </>
    );}
};
