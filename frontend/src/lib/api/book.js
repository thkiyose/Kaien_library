import { client } from './client';

export const fetchBookInfo = (params) => {
  return client.post("/books/fetch_book_info",params);
};
