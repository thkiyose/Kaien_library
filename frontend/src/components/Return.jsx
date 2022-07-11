import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Wrapper } from './parts/Wrapper';
import styled from "styled-components";
import { Context } from '../App';
import Color from './parts/Color';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLendingUser } from '../lib/api/lending';

const NotFoundExplanation = styled.p`
  font-size: 0.8rem;
  background-color: ${Color.text};
  padding: 20px;
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

export const Return = () => {
  const { currentUser } = useContext(Context);
  const location = useLocation();
  const bookId = location.state;
  const lendingId = useParams();
  const navigate = useNavigate();

  const handleFetchLendingUser = async(lendingId) => {
    const res = await fetchLendingUser(lendingId);
    if ( currentUser.id !== res.data.userId ){
      navigate("/mypage");
    };
  }
  useEffect(() => { handleFetchLendingUser(lendingId.id)},[]);

  return (
    <>
      <Wrapper width="500px">
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        {bookId ?
          <>
            <p>test</p>
          </> : <NotFoundExplanation>書籍の情報が見つかりません。マイページから返却操作を行って下さい。</NotFoundExplanation>}
      </Wrapper>
    </>
  );
};
