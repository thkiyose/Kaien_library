import { client } from './client';

export const fetchBooksAdmin = () => {
  return client.get("/admin/book_index");
};

export const fetchUsersAdmin = () => {
  return client.get("/admin/user_index");
};

export const searchBooks = (params) => {
  return client.post(`/admin/search_books`,params);
};
