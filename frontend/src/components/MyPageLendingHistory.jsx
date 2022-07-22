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
`

export const MyPageLendingHistory = () => {
  const navigate = useNavigate();
  const [lendings, setLendings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        <table>
          <tbody>
            {lendings.map((lending,key)=> {
              return (
                <React.Fragment key={key}>
                  <tr>
                    <td><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></td>
                  </tr>
                  <tr>

                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
};
