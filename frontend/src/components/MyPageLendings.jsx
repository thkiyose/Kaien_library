import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import Color from './parts/Color';
import { Context } from '../App';
import { fetchLendings } from '../lib/api/lending';
import { Modal } from './parts/Modal';
import { destroyReservation } from '../lib/api/reservation';

const Title = styled.h1`
  font-weight: lighter;
  font-size: 1rem;
  padding: 5px;
  background-color: ${Color.dark};
  color: white;
  margin: 0;
`
const Lendings = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  width: 100%;
`

const LendingRow = styled.tr`
  background-color: white;
  th {
    color: white;
    background-color: ${Color.primary};
    font-size: 0.8rem;
  }
  td, th {
    padding: 5px;
  }
  :nth-child(odd) {
    background-color: rgb(241, 241, 241);
  }
`
const OveredRow = styled(LendingRow)`
  background-color: ${Color.warning} !important;
`
const Warning = styled.tr`
  background-color: rgb(255, 181, 181) !important;
  text-align: center;
  width: 100%;
  td {
    padding: 0;
    font-size: 0.8rem;
  }
`
const CanLend = styled(Warning)`
  background-color: rgb(207, 255, 203) !important;
`

const TitleColumn = styled.th`
  width: 50%;
`
const DateColumn = styled.th`
  width: 13%;
`
const ButtonColumn = styled.th`
  width: 7%;
`

const ReturnButton = styled.button`
  padding: 3px;
  border: none;
  width: 100%;
  background-color: ${Color.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
`
const CancelButton = styled(ReturnButton)`
  padding: 3px;
  font-size: 0.7rem;
`

const NoBooks = styled.p`
  padding: 20px;
  margin: 0;
  text-align: center;
  background-color: ${Color.text};
`
const BookTitle = styled.td`
`
const Status = styled.td`
  text-align: center;
`
const Location = styled.td`
  text-align: center;
`
const ToReserve = styled.button`
  background-color: rgb(0,0,0,0);
  border: none;
  text-decoration: underline;
  cursor: pointer;
`
const PreviousLending = styled.p`
  text-align: right;
  margin: 0;
`

export const MyPageLendings = () => {
  const { currentUser,loading, setLoading } = useContext(Context);
  const [ lendings, setLendings ] = useState({});
  const [ lendingsExists, setLendingsExists] = useState(false)
  const [ reservations, setReservations ] = useState({});
  const [ showModal, setShowModal] = useState(false);
  const [ cancelTarget, setCancelTarget ] = useState(0);
  const today = new Date();
  const navigate = useNavigate();

  const handleFetchLendings = useCallback(async() => {
    const res = await fetchLendings(currentUser.id);
    setLendings(res.data.lendings);
    setLendingsExists(res.data.lendings.length > 0)
    setReservations(res.data.reservations);
    setLoading(false);
  },[currentUser.id,setLoading]);

  useEffect(() => {handleFetchLendings();
  },[handleFetchLendings,currentUser,setLoading]);

  const handleDestroyReservation = async(id) => {
    await destroyReservation(id);
    handleFetchLendings();
  }

  const handleShowModal = (reservationId) => {
    setShowModal(true);
    setCancelTarget(reservationId);
  }
  if (loading === false) {
    return (
      <>
      <Title>レンタル中の本</Title>
      {lendingsExists ?
        <>
          <Lendings>
            <tbody>
              <LendingRow>
                <TitleColumn></TitleColumn><DateColumn>貸出開始日</DateColumn><DateColumn>返却期限日</DateColumn><th>返却場所</th><ButtonColumn></ButtonColumn>
              </LendingRow>
              {lendings.map((lending,index) => {
                return (
                  <React.Fragment key={index}>
                    {Date.parse(lending.expiryDate) < today.setHours(0, 0, 0, 0) ?
                      <>
                        <OveredRow className="overExpiry">
                          <BookTitle><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></BookTitle><td>{lending.startDate}</td><td>{lending.expiryDate}</td><Location>{lending.location}</Location><td><ReturnButton onClick={() => {navigate(`/return/${lending.id}`, { state:{ bookId: lending.bookId } })}}>返却</ReturnButton></td>
                        </OveredRow>
                        <Warning>
                          <td colSpan="5">返却期限を過ぎています。返却手続きを行って下さい。</td>
                        </Warning>
                      </> :
                      <LendingRow key={index}>
                        <BookTitle><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></BookTitle><td>{lending.startDate}</td><td>{lending.expiryDate}</td><Location>{lending.location}</Location><td><ReturnButton onClick={() => {navigate(`/return/${lending.id}`, { state:{ bookId: lending.bookId } })}}>返却</ReturnButton></td>
                      </LendingRow> }
                  </React.Fragment>
                );
              })}
            </tbody>
          </Lendings>
        </> : <NoBooks>現在レンタル中の本はありません。</NoBooks>}
        <Title>予約中の本</Title>
        {reservations.length > 0 ?
          <>
            <Lendings>
              <tbody>
                <LendingRow>
                  <TitleColumn></TitleColumn><DateColumn>貸出開始日</DateColumn><DateColumn>返却期限日</DateColumn><th>ステータス</th><ButtonColumn></ButtonColumn>
                </LendingRow>
                {reservations.map((reservation,index) => {
                  return (
                    <React.Fragment key={index}>
                      {reservation.canLend ?
                        <>
                          <LendingRow>
                            <BookTitle><Link to={`/books/${reservation.bookId}`}>{reservation.title}</Link></BookTitle><td>{reservation.startDate}</td><td>{reservation.expiryDate}</td><Status>{reservation.canLend ? "貸出可" : "予約中"}</Status><td><CancelButton　onClick={() =>{handleShowModal(reservation.id)}}>キャンセル</CancelButton></td>
                          </LendingRow>
                          <CanLend>
                            <td colSpan="5">レンタルが可能になりました。<ToReserve onClick={()=>{navigate(`/reservationlending/${reservation.bookId}`, { state:{ bookId: reservation.bookId, userId: currentUser.id } })}}>レンタルに進む</ToReserve></td>
                          </CanLend>
                        </> :
                        <LendingRow>
                          <BookTitle><Link to={`/books/${reservation.bookId}`}>{reservation.title}</Link></BookTitle><td>{reservation.startDate}</td><td>{reservation.expiryDate}</td><Status>{reservation.canLend ? "貸出可" : "予約中"}</Status><td><CancelButton　onClick={() =>{handleShowModal(reservation.id)}}>キャンセル</CancelButton></td>
                        </LendingRow> }
                      </React.Fragment>
                  );
                })}
              </tbody>
            </Lendings>
          </> : <NoBooks>現在予約中の本はありません。</NoBooks>}
          <Modal showFlag={showModal} setShowModal={setShowModal} message={"本当にキャンセルしますか？"} yesAction={()=>{handleDestroyReservation(cancelTarget)}} />
          <PreviousLending><Link to="/mypage/history">過去のレンタル一覧</Link></PreviousLending>
        </>
    );
  }
}
