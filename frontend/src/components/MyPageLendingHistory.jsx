import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import Color from './parts/Color';
import { Context } from '../App';
import { fetchPreviousLendings } from '../lib/api/lending';

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
  margin-bottom: 10px;
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

export const MyPageLendingHistory = () => {
  const navigate = useNavigate();
  const [lendings, setLendings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(Context);

  useEffect(() => {
    const fetchLendings = async () => {
      const res = await fetchPreviousLendings(currentUser.id)
      setLendings(res.data.lendings);
      setIsLoading(false);
    };
    fetchLendings();
  }, []);

  if (isLoading === false) {
    return(
      <>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <Lendings>
          <tbody>
            <LendingRow>
              <th>タイトル</th><th>レンタル開始日</th><th>返却日</th>
            </LendingRow>
            {lendings.map((lending,key)=> {
              return (
                <React.Fragment key={key}>
                  <LendingRow>
                    <td><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></td><td>{lending.startDate}</td><td>{lending.finishedAt}</td>
                  </LendingRow>
                </React.Fragment>
              );
            })}
          </tbody>
        </Lendings>
      </>
    );
  }
};
