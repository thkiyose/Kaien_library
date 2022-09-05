import React, { useState } from 'react';
import { Wrapper } from '../parts/Wrapper';
import styled from "styled-components";
import Color from '../parts/Color';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { SpinnerForCSVImport } from '../parts/SpinnerForCSVImport';
import { createFromImported } from '../../lib/api/admin';

export const ImportResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const perPage = 18;
  const [ submitting, setSubmitting ] = useState(false);
  const [ start, setStart ] = useState(0);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  const handleSubmit = async() => {
    setSubmitting(true);
    const res = await createFromImported({result: location.state.result})
    navigate("/admin/book_registration/complete",{state: { status: res.data.status, count: res.data.count }});
    setSubmitting(false);
  }
if (location.state) {
  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <Title>読み込み結果</Title>
        <Count>{location.state?.result.length}件のデータを読み込みました。　登録可能: {location.state?.successCount}件　登録不可: {location.state?.failureCount}件</Count>
        <Table>
          <thead>
            <tr>
              <th>No.</th><th>タイトル</th><th>結果</th>
            </tr>
          </thead>
          <tbody>
            {location.state?.result.slice(start, start + perPage).map((result,index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="result">
                      <td className="index">{index + 1 + start}</td>
                      <td>{result.data.title ? result.data.title : "タイトルがありません"}</td>
                      <td className={`status ${result.status}`}>{ result.status === "SUCCESS" && "登録可能"}{ result.status === "FAILURE" && "登録不可"}</td>
                    </tr>
                    {result.warning.length > 0 &&
                      <tr className="warning">
                        <td colSpan="3"><Icon src={`${process.env.PUBLIC_URL}/warning.png`} />{result.warning}</td>
                      </tr>
                    }
                    { result.status === "FAILURE" &&
                      <tr className="error">
                        <td colSpan="3"><Icon src={`${process.env.PUBLIC_URL}/error.png`} />{result.errors}</td>
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
          pageCount={Math.ceil(location.state?.result.length / perPage)}
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
        <SubmitButton onClick={()=>{handleSubmit(location.state?.result)}}>このデータで書籍を登録する</SubmitButton>
        {submitting === true && <SpinnerForCSVImport message={"登録しています..."} />}
      </Wrapper>
    </>
  );} else {
    return (
      <>
        <Wrapper width="500px">
          データがありません。正しい手順で登録をやり直して下さい。
        </Wrapper>
      </>
    );
  }
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
      color: rgb(172, 157, 18);
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
  background-color: ${Color.text};
  padding: 10px;
`
const Icon = styled.img`
  height: 0.9rem;
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
const SubmitButton = styled.button`
  margin: 0 auto;
  margin-top: 20px;
  display: block;
  font-size: 1rem;
  width: 50%;
  text-align: center;
  border: 0;
  padding: 10px 40px;
  color: #ffffff;
  background-color: ${Color.primary};
  cursor: pointer;
`

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
`
