import { client } from './client';

export const fetchBooksAdmin = () => {
  return client.get("/admin/book_index");
};
