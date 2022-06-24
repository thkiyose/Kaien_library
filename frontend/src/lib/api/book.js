import { client } from './client';

export const fetchBookInfo = (params) => {
  return client.post("/books/fetch_book_info",params);
};

export const fetchCategories = () => {
  return client.get("/books/fetch_categories");
};

export const fetchLocations = () => {
  return client.get("/books/fetch_locations");
};
