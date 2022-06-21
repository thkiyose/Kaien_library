import { client } from './client';

export const fetchBookInfo = (params) => {
  return client.get('/books/fetch_book_info', params);
};
