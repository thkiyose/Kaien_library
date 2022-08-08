import { client } from './client';

export const fetchBooksAdmin = () => {
  return client.get("/admin/books");
};

export const searchBooks = (free_word,category_id) => {
  return client.get(`/admin/books/search`, { params:{q : free_word, category :category_id}});
};

export const deleteBook = (book_id) => {
  return client.delete(`/admin/books/${book_id}`);
};

export const fetchUsersAdmin = () => {
  return client.get("/admin/users");
};

export const adminChangeUser = (user_id) => {
  return client.patch(`/admin/users/${user_id}`);
};

export const deleteUser = (user_id) => {
  return client.delete(`/admin/users/${user_id}`);
};
