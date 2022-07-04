import React, { useEffect, useState } from 'react';
import { Context } from '../App';
import { Wrapper } from './parts/Wrapper';
import { deleteBook } from '../lib/api/book';
import { fetchBooks } from '../lib/api/book';

export const AdminBookIndex = () => {
  const [ books, setBooks ] = useState({});

  const handleFetchBooks= async() => {
    const res = await fetchBooks();
    setBooks(res.data.books);
  }
  useEffect(() => { handleFetchBooks() }, []);

  const handleDeleteBook = async(book_id) => {
    const res = await deleteBook(book_id);
    handleFetchBooks();
  };


  return(
    <>
      <Wrapper width={"800px"}>
        <h1>書籍一覧</h1>
        <table>
          <tbody>
            {Object.keys(books).map((key) => {
              return (
                <tr key={key}>
                  <td>{books[key].title}</td><td><button onClick={() => handleDeleteBook(books[key].id)}>削除</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};
