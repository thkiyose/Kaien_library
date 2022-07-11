import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Color from './parts/Color';
import { Context } from '../App';
import { fetchLendings } from '../lib/api/lending';

const Title = styled.h1`
  font-weight: lighter;
  font-size: 1.4rem;
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
  }
  td, th {
    padding: 10px;
  }
  :nth-child(odd) {
    background-color: ${Color.text};
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
  padding: 7px;
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

export const MyPageLendings = () => {
  const { currentUser } = useContext(Context);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ lendings, setLendings ] = useState({});
  const today = new Date();
  const navigate = useNavigate();

  const handleFetchLendings = async() => {
    const res = await fetchLendings(currentUser.id);
    setLendings(res.data.lendings);
    setIsLoading(false);
  };

  useEffect(() => {handleFetchLendings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (isLoading === false) {
    return (
      <>
        <Title>レンタル/予約一覧</Title>
        <Lendings>
          <tbody>
            <LendingRow>
              <th></th><th>貸出開始日</th><th>返却期限日</th><th></th>
            </LendingRow>
            {lendings.map((lending,index) => {
              return (
                <React.Fragment key={index}>
                  {Date.parse(lending.expiryDate) < today ?
                    <>
                      <OveredRow className="overExpiry">
                        <td>{lending.title}</td><td>{lending.startDate}</td><td>{lending.expiryDate}</td><td><ReturnButton onClick={() => {navigate(`/return/${lending.id}`, { state:{ bookId: lending.bookId } })}}>返却</ReturnButton></td>
                      </OveredRow>
                      <Warning>
                        <td colSpan="4">返却期限を過ぎています。返却手続きを行って下さい。</td>
                      </Warning>
                    </> :
                    <LendingRow key={index}>
                      <td>{lending.title}</td><td>{lending.startDate}</td><td>{lending.expiryDate}</td><td><ReturnButton>返却</ReturnButton></td>
                    </LendingRow> }
                </React.Fragment>
              );
            })}
          </tbody>
        </Lendings>
      </>
    );
  }
};
