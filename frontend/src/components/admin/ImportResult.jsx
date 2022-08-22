import React from 'react';
import { Wrapper } from '../parts/Wrapper';
import styled from "styled-components";
import Color from '../parts/Color';
import { Link, useLocation } from 'react-router-dom';

export const ImportResult = () => {
  const location = useLocation();
  const {result, successCount, failureCount} = location.state;

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
            {result.map((result,index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="result">
                      <td className="index">{index + 1}</td>
                      <td>{result.title ? <Link to={`/books/${result.id}`}>{result.title}</Link> : "タイトルがありません"}</td>
                      <td className={`status ${result.status}`}>{ result.status === "SUCCESS" && "登録成功"}{ result.status === "FAILURE" && "登録失敗"}</td>
                    </tr>
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
