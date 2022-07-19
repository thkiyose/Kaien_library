import React, { useState , useLayoutEffect } from 'react';
import { Wrapper } from './parts/Wrapper';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Color from './parts/Color';
import { Modal } from './parts/Modal';
import { format } from 'date-fns';
import { fetchCurrentUserReservation } from '../lib/api/reservation';
import { destroyReservation } from '../lib/api/reservation';

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

const Detail = styled.div`
  text-align:center;
  table {
    width: 100%;
    border-collapse:  collapse;
  }
  td {
    background-color: white;
    padding: 10px;
  }
  th {
    background-color: ${Color.text};
    padding: 10px;
    width: 100px;
    font-weight: lighter;
  }
`
const Rent = styled.button`
  padding: 30px;
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
  :active {
  	-webkit-transform: translate(0,2px);
  	-moz-transform: translate(0,4px);
  	transform: translate(0,4px);
  	border-bottom:none;
    margin-bottom: 4px;
	}
`
const Title = styled.td`
  background-color: ${Color.light} !important;
  padding: 10px;
`

const EmptyGuide = styled.div`
  margin: 20px auto;
  background-color:${Color.text};
  padding: 20px;
  text-align: center;
`
const Cancel = styled.button`
  border: none;
  background-color: rgb(0,0,0,0);
  font-weight: lighter;
  cursor: pointer;
  text-decoration: underline;
  padding-top: 10px;
`

export const ReservationToLending = () => {
  const location = useLocation();
  const bookId = location.state?.bookId;
  const userId = location.state?.userId;
  const navigate = useNavigate();
  const [ reservation ,setReservation ] = useState();
  const [ book, setBook ] = useState();
  const [showModal, setShowModal] = useState(false);

  const fetchReservation = async(bookId,currentUserId) => {
    const res = await fetchCurrentUserReservation(bookId,currentUserId);
    setReservation(res.data.reservation);
    setBook(res.data.book);
  };

  const handleShowModal = () => {
    setShowModal(true);
  }
  useLayoutEffect(()=>{fetchReservation(bookId,userId)},[bookId,userId])

  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        {bookId && reservation && book ?
          <>
            <Detail>
              <p>予約している書籍をレンタルします。</p>
              <table>
                <tbody>
                  <tr>
                    <Title colSpan="3">{book.title}</Title>
                  </tr>
                  <tr>
                    <th>貸出開始日</th><td>{format(new Date(), 'yyyy-MM-dd')}(今日)</td>
                  </tr>
                  <tr>
                    <th>返却期限日</th><td>{reservation.expiryDate}</td>
                  </tr>
                </tbody>
              </table>
              <Rent>この期間で借りる</Rent>
              <Cancel onClick={() =>{handleShowModal()}}>予約をキャンセルする</Cancel>
            </Detail>
          </>
        :
          <EmptyGuide>予約の情報を取得できません。書籍詳細画面から操作を行って下さい。</EmptyGuide>
        }
       <Modal showFlag={showModal} setShowModal={setShowModal} message={"本当にキャンセルしますか？"} />
      </Wrapper>
    </>
  );
};
