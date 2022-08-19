import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import Color from './parts/Color';
import { Context } from '../App';
import { fetchPreviousLendings } from '../lib/api/lending';
import ReactPaginate from 'react-paginate';

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
const NoLendings = styled.p`
  padding: 20px;
  margin: 0;
  text-align: center;
  background-color: ${Color.text};
`

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  margin-top: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: ${Color.primary};
    color: white;
    border-color: transparent;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`

export const MyPageLendingHistory = () => {
  const navigate = useNavigate();
  const [lendings, setLendings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(Context);
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  useEffect(() => {
    const fetchLendings = async () => {
      const res = await fetchPreviousLendings(currentUser.id)
      setLendings(res.data.lendings);
      setIsLoading(false);
    };
    fetchLendings();
  }, [currentUser.id]);

  if (isLoading === false && lendings.length > 0) {
    return(
      <>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <Lendings>
          <tbody>
            <LendingRow>
              <th>タイトル</th><th>レンタル開始日</th><th>返却日</th>
            </LendingRow>
            {lendings.slice(start, start + perPage).map((lending,key)=> {
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
        <MyPaginate
          onPageChange={handlePageChange}
          pageCount={Math.ceil(lendings.length / perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName='pagination'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          activeClassName='active'
          previousLabel='<'
          nextLabel='>'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          disabledClassName='disabled'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
        />
      </>
    );
  } else {
    return (
      <>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <NoLendings>レンタル履歴がありません。</NoLendings>
      </>
    );
  }
};
