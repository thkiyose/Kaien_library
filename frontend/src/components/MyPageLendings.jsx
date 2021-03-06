import React, { useContext, useState, useEffect } from 'react';
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
const ToReserve = styled.button`
  background-color: rgb(0,0,0,0);
  border: none;
  text-decoration: underline;
  cursor: pointer;
`
const PreviousLending = styled(Link)`
  display: block;
  text-align:right;
`

export const MyPageLendings = () => {
  const { currentUser } = useContext(Context);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ lendings, setLendings ] = useState({});
  const [ reservations, setReservations ] = useState({});
  const [ showModal, setShowModal] = useState(false);
  const [ cancelTarget, setCancelTarget ] = useState(0);
  const today = new Date();
  const navigate = useNavigate();

  const handleFetchLendings = async() => {
    const res = await fetchLendings(currentUser.id);
    setLendings(res.data.lendings);
    setReservations(res.data.reservations);
    setIsLoading(false);
  };

  useEffect(() => {handleFetchLendings();
  },[currentUser]);

  const handleDestroyReservation = async(id) => {
    await destroyReservation(id);
    handleFetchLendings();
  }

  const handleShowModal = (reservationId) => {
    setShowModal(true);
    setCancelTarget(reservationId);
  }
  if (isLoading === false) {
    return (
      <>
      <Title>?????????????????????</Title>
      {lendings.length > 0 ?
        <>
          <Lendings>
            <tbody>
              <LendingRow>
                <TitleColumn></TitleColumn><DateColumn>???????????????</DateColumn><DateColumn>???????????????</DateColumn><th>????????????</th><ButtonColumn></ButtonColumn>
              </LendingRow>
              {lendings.map((lending,index) => {
                return (
                  <React.Fragment key={index}>
                    {Date.parse(lending.expiryDate) < today.setHours(0, 0, 0, 0) ?
                      <>
                        <OveredRow className="overExpiry">
                          <BookTitle><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></BookTitle><td>{lending.startDate}</td><td>{lending.expiryDate}</td><td>{lending.location}</td><td><ReturnButton onClick={() => {navigate(`/return/${lending.id}`, { state:{ bookId: lending.bookId } })}}>??????</ReturnButton></td>
                        </OveredRow>
                        <Warning>
                          <td colSpan="5">???????????????????????????????????????????????????????????????????????????</td>
                        </Warning>
                      </> :
                      <LendingRow key={index}>
                        <BookTitle><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></BookTitle><td>{lending.startDate}</td><td>{lending.expiryDate}</td><td>{lending.location}</td><td><ReturnButton onClick={() => {navigate(`/return/${lending.id}`, { state:{ bookId: lending.bookId } })}}>??????</ReturnButton></td>
                      </LendingRow> }
                  </React.Fragment>
                );
              })}
            </tbody>
          </Lendings>
        </> : <NoBooks>????????????????????????????????????????????????</NoBooks>}
        <Title>???????????????</Title>
        {reservations.length > 0 ?
          <>
            <Lendings>
              <tbody>
                <LendingRow>
                  <TitleColumn></TitleColumn><DateColumn>???????????????</DateColumn><DateColumn>???????????????</DateColumn><th>???????????????</th><ButtonColumn></ButtonColumn>
                </LendingRow>
                {reservations.map((reservation,index) => {
                  return (
                    <React.Fragment key={index}>
                      {reservation.canLend ?
                        <>
                          <LendingRow>
                            <BookTitle><Link to={`/books/${reservation.bookId}`}>{reservation.title}</Link></BookTitle><td>{reservation.startDate}</td><td>{reservation.expiryDate}</td><Status>{reservation.canLend ? "?????????" : "?????????"}</Status><td><CancelButton???onClick={() =>{handleShowModal(reservation.id)}}>???????????????</CancelButton></td>
                          </LendingRow>
                          <CanLend>
                            <td colSpan="5">??????????????????????????????????????????<ToReserve onClick={()=>{navigate(`/reservationlending/${reservation.bookId}`, { state:{ bookId: reservation.bookId, userId: currentUser.id } })}}>?????????????????????</ToReserve></td>
                          </CanLend>
                        </> :
                        <LendingRow>
                          <BookTitle><Link to={`/books/${reservation.bookId}`}>{reservation.title}</Link></BookTitle><td>{reservation.startDate}</td><td>{reservation.expiryDate}</td><Status>{reservation.canLend ? "?????????" : "?????????"}</Status><td><CancelButton???onClick={() =>{handleShowModal(reservation.id)}}>???????????????</CancelButton></td>
                        </LendingRow> }
                      </React.Fragment>
                  );
                })}
              </tbody>
            </Lendings>
          </> : <NoBooks>??????????????????????????????????????????</NoBooks>}
          <Modal showFlag={showModal} setShowModal={setShowModal} message={"???????????????????????????????????????"} yesAction={()=>{handleDestroyReservation(cancelTarget)}} />
          <PreviousLending to="/mypage/history">???????????????????????????</PreviousLending>
        </>
    );
  }
}
