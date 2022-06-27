import React, { useContext } from 'react';
import { Context } from '../App';
import { Wrapper } from './parts/Wrapper';
import { Link } from 'react-router-dom';

export const AdminBookIndex = () => {
  const { books } = useContext(Context);
  return(
    <>
      <Wrapper width={"800px"}>
        <div>
          <h1>書籍一覧</h1>
          <table>
            {Object.keys(books).map((key) => {
              return (
                <tr>
                  <td key={key}>{books[key].title}</td><td><Link to="#">削除</Link></td>
                </tr>
              );
            })}
          </table>
        </div>
      </Wrapper>
    </>
  );
};
