import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import Color from './parts/Color';
import { Context } from '../App';
import { fetchLendings } from '../lib/api/lending';

const Title = styled.h1`
  font-weight: lighter;
  font-size: 1.2rem;
`
const Lendings = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
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
  td {
    padding: 0;
    font-size: 0.8rem;
  }
`
const ReturnButton = styled.button`
  padding: 3px;
  border: none;
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
  margin-top: 20px;
  text-align: center;
  background-color: ${Color.text};
`
const BookTitle = styled.td`
`

export const MyPageLendings = () => {
  const { currentUser } = useContext(Context);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ lendings, setLendings ] = useState({});
  const [ reservations, setReservations ] = useState({});
  const today = new Date();
  const navigate = useNavigate();

  const handleFetchLendings = async() => {
    const res = await fetchLendings(currentUser.id);
    setLendings(res.data.lendings);
    setReservations(res.data.reservations);
    setIsLoading(false);
  };

  useEffect(() => {handleFetchLendings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (isLoading === false && lendings.length >= 1) {
    return (
      <>
        <Title>レンタル中の本</Title>
        <Lendings>
          <tbody>
            <LendingRow>
              <th></th><th>貸出開始日</th><th>返却期限日</th><th>返却場所</th><th></th>
            </LendingRow>
            {lendings.map((lending,index) => {
              return (
                <React.Fragment key={index}>
                  {Date.parse(lending.expiryDate) < today.setHours(0, 0, 0, 0) ?
                    <>
                      <OveredRow className="overExpiry">
                        <BookTitle><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></BookTitle><td>{lending.startDate}</td><td>{lending.expiryDate}</td><td>{lending.location}</td><td><ReturnButton onClick={() => {navigate(`/return/${lending.id}`, { state:{ bookId: lending.bookId } })}}>返却</ReturnButton></td>
                      </OveredRow>
                      <Warning>
                        <td colSpan="4">返却期限を過ぎています。返却手続きを行って下さい。</td>
                      </Warning>
                    </> :
                    <LendingRow key={index}>
                      <BookTitle><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></BookTitle><td>{lending.startDate}</td><td>{lending.expiryDate}</td><td>{lending.location}</td><td><ReturnButton onClick={() => {navigate(`/return/${lending.id}`, { state:{ bookId: lending.bookId } })}}>返却</ReturnButton></td>
                    </LendingRow> }
                </React.Fragment>
              );
            })}
          </tbody>
        </Lendings>
        <Title>予約中の本</Title>
<Lendings>
  <tbody>
    <LendingRow>
      <th></th><th colSpan="2">予約期間</th><th colSpan="2"></th>
    </LendingRow>
    {reservations.map((reservation,index) => {
      return (
          <LendingRow key={index}>
            <BookTitle><Link to={`/books/${reservation.bookId}`}>{reservation.title}</Link></BookTitle><td>{reservation.startDate}</td><td>{reservation.expiryDate}</td><td></td><td><CancelButton>キャンセル</CancelButton></td>
          </LendingRow>
      );
    })}
  </tbody>
</Lendings>
      </>
    );
  } else if ( isLoading === false && lendings.length === 0) {
    return (
      <NoBooks>現在借りている本、予約している本はありません。</NoBooks>
    );
  }
}
