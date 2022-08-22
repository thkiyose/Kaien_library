import React, { useState } from 'react';
import { Wrapper } from '../parts/Wrapper';
import styled from "styled-components";
import Color from '../parts/Color';
import { Link, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const ImportResult = () => {
  const location = useLocation();
  const perPage = 18;
  const [ start, setStart ] = useState(0);
  const {result, successCount, failureCount} = location.state;

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  return (
    <>
      <Wrapper width={"800px"}>
        <Title>インポート結果</Title>
        <Count>{result.length}件のデータをインポートしました。   成功:{successCount}件 失敗:{failureCount}件</Count>
        <Table>
          <thead>
            <tr>
              <th>No.</th><th>タイトル</th><th>結果</th>
            </tr>
          </thead>
          <tbody>
            {result.slice(start, start + perPage).map((result,index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="result">
                      <td className="index">{index + 1}</td>
                      <td>{result.title ? <Link to={`/books/${result.id}`}>{result.title}</Link> : "タイトルがありません"}</td>
                      <td className={`status ${result.status}`}>{ result.status === "SUCCESS" && "登録成功"}{ result.status === "FAILURE" && "登録失敗"}</td>
                    </tr>
                    {result.warning &&
                      <tr className="warning">
                        <td colSpan="3">{result.warning}</td>
                      </tr>
                    }
                    { result.status === "FAILURE" &&
                      <tr className="error">
                        <td colSpan="3">{result.errors}</td>
                      </tr>
                    }
                  </React.Fragment>
                );
              })
            }
          </tbody>
        </Table>
        <MyPaginate
          onPageChange={handlePageChange}
          pageCount={Math.ceil(result.length / perPage)}
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
        <Link to="/admin">管理メニューに戻る</Link>
      </Wrapper>
    </>
  );
}

const Title = styled.h1`
  margin: 10;
  text-align :center;
  font-size: 1.4rem;
`
const Table = styled.table`
  border: none;
  border-collapse: collapse;
  width: 100%;
  thead {
    font-size: 0.9rem;
    background-color: ${Color.primary};
    color: white;
  }
  tbody {
    font-size:0.8rem;
    .result {
      border-top: solid 1px rgb(209, 209, 209);
    }
    .error {
      color: rgb(157, 58, 58);
    }
    .warning {
      color: rgb(199, 185, 57);
    }
    .index {
      width: 7%;
      text-align:center;
    }
    .status {
      width: 10%;
      text-align: center;
      border-radius: 10px;
    }
    .SUCCESS {
      background-color: rgb(207, 255, 203) !important;
    }
    .FAILURE {
      background-color: rgb(235, 158, 158) !important;
    }
  }
`
const Count = styled.p`
  text-align: center;
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
