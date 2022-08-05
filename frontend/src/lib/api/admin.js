import { client } from './client';

export const fetchBooksAdmin = () => {
  return client.get("/admin/books");
};

export const fetchUsersAdmin = () => {
  return client.get("/admin/users");
};

export const searchBooks = (free_word,category_id) => {
  return client.get(`/admin/books/search`, { params:{q : free_word, category :category_id}});
};

export const deleteBook = (book_id) => {
  return client.delete(`/admin/books/${book_id}`);
};
