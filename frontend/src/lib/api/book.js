import { client } from './client';

export const fetchBooks = () => {
  return client.get("/books");
};

export const fetchBooksForAdmin = () => {
  return client.get("/books/index_for_admin");
};

export const search = (params) => {
  return client.post(`/books/search`,params);
};

export const showBook = (book_id, current_user_id) => {
  return client.get(`/books/${book_id}`, { params:{user_id: current_user_id}});
};

export const fetchBookInfo = (params) => {
  return client.post("/books/fetch_book_info",params);
};

export const fetchCategories = () => {
  return client.get("/books/fetch_categories");
};

export const fetchLocations = () => {
  return client.get("/books/fetch_locations");
};

export const createBook = (params) => {
  return client.post("/books",params);
};

export const deleteBook = (book_id) => {
  return client.patch(`books/${book_id}/delete_book`);
};
