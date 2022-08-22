import React from 'react';
import { Wrapper } from '../parts/Wrapper';
import { useLocation } from 'react-router-dom';

export const ImportResult = () => {
  const location = useLocation();
  const result = location.state;
  return (
    <>
      <Wrapper width={"800px"}>
        <h1>インポート結果</h1>
        <table>
          <thead>
            <tr>
              <th></th><th>タイトル</th><th>結果</th>
            </tr>
          </thead>
          <tbody>
            {result.map((result,index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{result.title ? result.title : "タイトルがありません"}</td>
                    <td>{ result.status === "SUCCESS" && "登録成功"}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Wrapper>
    </>
  );
}
