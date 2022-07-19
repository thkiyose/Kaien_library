import React, { useState ,useContext, useLayoutEffect } from 'react';
import { Context } from '../App';
import { Wrapper } from './parts/Wrapper';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Color from './parts/Color';
import { format, addDays, eachDayOfInterval } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { fetchLendingsAndReservations } from '../lib/api/reservation';

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
const Calendar = styled.div`
  float:left;
  padding-bottom: 10px;
`

const Detail = styled.div`
  float:right;
  width: 50%;
  height: 300px;
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
  float: left;
  margin: 70px 85px;
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
	}
`

const EmptyGuide = styled.div`
  margin: 20px auto;
  background-color:${Color.text};
  padding: 20px;
  text-align: center;
`
const ClearFix = styled.div`
  content: "";
  display: block;
  clear: both;
`

export const Lending = () => {
  const { currentUser } = useContext(Context);
  const location = useLocation();
  const bookId = location.state;
  const [ disabled, setDisabled ] = useState([]);
  const navigate = useNavigate();
  const [ error, setError ] = useState();
  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  });

  const disableDates = async(bookId) => {
    const res = await fetchLendingsAndReservations(bookId)
    const toDisable = []
    res.data.lendings.map(lending => {toDisable.push(...eachDayOfInterval({start: new Date(lending.startDate), end: new Date(lending.expiryDate)}))})
    res.data.reservations.map(reservation => {toDisable.push(...eachDayOfInterval({start: new Date(reservation.startDate), end: new Date(reservation.expiryDate)}))})
    setDisabled(toDisable);
  };
  useLayoutEffect(()=>{disableDates(bookId.bookId)},[bookId]);

  const handleSelect = (item) => {
    const interval = (new Date() - item.selection.endDate) / 86400000;
    if (interval > -14) {
      setState({
        selection: {
          startDate: new Date(),
          endDate: item.selection.endDate,
          key: 'selection'
        }
      });
    } else {
      setState({
        selection: {
          startDate: item.selection.startDate,
          endDate: addDays(item.selection.startDate, 14),
          key: 'selection'
        }
      });
    };
  };

  const handleCreateLending = async() => {
    const params = {userId: currentUser.id,bookId: bookId.bookId, startDate: state.selection.startDate.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }), expiryDate: state.selection.endDate.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })};
    const res = await createLending(params);
    if (res.data.status === "SUCCESS") {
      navigate("/thankyouforlending", {state: { bookLent: true, bookLocation: res.data.location }})
    } else if (res.data.message){
      setError(res.data.message);
    }
  };

  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        {bookId ?
          <>
            <Detail>
              <p>予約している書籍をレンタルします。</p>
              <table>
                <tbody>
                  <tr>
                    <th>貸出開始日</th><td></td>
                  </tr>
                  <tr>
                    <th>返却期限日</th><td></td>
                  </tr>
                </tbody>
              </table>
              <Rent}>この期間で借りる</Rent>
            </Detail>
            <ClearFix />
            <span>{error}</span>
          </>
        :
          <EmptyGuide>書籍の情報を取得できません。書籍詳細画面からレンタル操作を行って下さい。</EmptyGuide>
        }
      </Wrapper>
    </>
  );
};
