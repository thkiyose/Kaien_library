import React, { useState } from 'react';
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

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
`
const EmptyGuide = styled.div`
  margin: 20px auto;
  background-color:${Color.text};
  padding: 20px;
  text-align: center;
`

export const Lending = () => {
  const location = useLocation();
  const bookId = location.state;
  const navigate = useNavigate();
  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  });
const reservedDates = eachDayOfInterval(
  { start: new Date(2022, 6, 10), end: new Date(2022, 6, 20) }
).concat(eachDayOfInterval(
  { start: new Date(2022, 7, 10), end: new Date(2022, 7, 20) }
))

  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        {bookId ?
          <>
            <div>
            <DateRange
              editableDateInputs={true}
              months={1}
              locale={ja}
              moveRangeOnFirstSelection={false}
              ranges={[state.selection]}
              onChange={item => setState({ ...state, ...item })}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 3)}
              rangeColors={[Color.primary]}
              disabledDates={reservedDates}
              dateDisplayFormat={"yyyy/MM/dd"}
              monthDisplayFormat={"yyyy年MMM"}
              showDateDisplay={false}
            />
            </div>
            <div>
              <p>{format(state.selection.startDate, 'yyyy-MM-dd')}</p>
              <p>{format(state.selection.endDate, 'yyyy-MM-dd')}</p>
            </div>
          </>
        :
          <EmptyGuide>書籍の情報を取得できません。書籍詳細画面からレンタル操作を行って下さい。</EmptyGuide>
        }
      </Wrapper>
    </>
  );
};
