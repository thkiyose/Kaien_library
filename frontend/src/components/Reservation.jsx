import React, { useState ,useContext } from 'react';
import { Context } from '../App';
import { Wrapper } from './parts/Wrapper';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Color from './parts/Color';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, addDays, addMonths, eachDayOfInterval } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { fetchLendings } from '../lib/api/lending';

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
    font-weight: lighter;
  }
`
const Reserve = styled.button`
  padding: 20px;
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

export const Reservation = () => {
  const { currentUser } = useContext(Context);
  const location = useLocation();
  const bookId = location.state;
  const navigate = useNavigate();
  const [ error, setError ] = useState();
  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  });

  const handleSelect = (item) => {
    const interval = (item.selection.startDate - item.selection.endDate) / 86400000;
    if (interval > -15) {
      setState({
        selection: {
          startDate: item.selection.startDate,
          endDate: item.selection.endDate,
          key: 'selection'
        }
      })
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

  const reserved = []
  reserved.push(...eachDayOfInterval({start:addDays(new Date(),5),end:addDays(new Date(),7)}))
    reserved.push(...eachDayOfInterval({start:addDays(new Date(),9),end:addDays(new Date(),10)}))

  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        {bookId ?
          <>
            <Calendar>
            <DateRange
              editableDateInputs={true}
              months={1}
              locale={ja}
              moveRangeOnFirstSelection={false}
              ranges={[state.selection]}
              onChange={(item) => handleSelect(item)}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 3)}
              rangeColors={[Color.primary]}
              dateDisplayFormat={"yyyy/MM/dd"}
              monthDisplayFormat={"yyyy年MMM"}
              showDateDisplay={false}
              preventSnapRefocus={false}
              disabledDates={reserved}
            />
            </Calendar>
            <Detail>
              <p>予約する期間を選択して下さい。（最大2週間)</p>
              <table>
                <tbody>
                  <tr>
                    <th>貸出開始日</th><td>{format(state.selection.startDate, 'yyyy-MM-dd')}</td>
                  </tr>
                  <tr>
                    <th>返却期限日</th><td>{format(state.selection.endDate, 'yyyy-MM-dd')}</td>
                  </tr>
                </tbody>
              </table>
              <Reserve>この期間で予約する</Reserve>
            </Detail>
            <ClearFix />
            <span>{error}</span>
          </>
        :
          <EmptyGuide>書籍の情報を取得できません。書籍詳細画面から予約操作を行って下さい。</EmptyGuide>
        }
      </Wrapper>
    </>
  );
};
