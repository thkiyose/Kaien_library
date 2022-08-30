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

export const importBooksFromCSV = (csv,isbnUsage) => {
  return client.post("/admin/books/import_from_csv",{csv,isbnUsage});
};

export const createFromImported = (result) => {
  return client.post("/admin/books/create_from_imported",result);
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

export const searchUsers = (params) => {
  return client.get(`/admin/users/search`,{params});
};

export const fetchLendingsAdmin = (params) => {
  return client.get("/admin/lendings",{params});
};

export const returnLending = (lending_id) => {
  return client.patch(`/admin/lendings/${lending_id}`);
};

export const deleteLending = (lending_id) => {
  return client.delete(`/admin/lendings/${lending_id}`);
};

export const searchLendings = (params) => {
  return client.get(`/admin/lendings/search`,{params});
};

export const fetchReservationsAdmin = (params) => {
  return client.get("/admin/reservations",{params});
};

export const searchReservations = (params) => {
  return client.get(`/admin/reservations/search`,{params});
};

export const deleteReseravtion = (reservation_id) => {
  return client.delete(`/admin/reservations/${reservation_id}`);
};

export const fetchReviewsAdmin = (params) => {
  return client.get("/admin/reviews",{params});
};

export const deleteReview = (review_id) => {
  return client.delete(`/admin/reviews/${review_id}`);
};

export const searchReviews = (params) => {
  return client.get(`/admin/reviews/search`,{params});
};

export const fetchCategoriesForAdmin = () => {
  return client.get("/admin/categories");
};

export const createCategory = (params) => {
  return client.post("/admin/categories", params);
};

export const deleteCategory = (category_id) => {
  return client.delete(`/admin/categories/${category_id}`);
};

export const fetchLocationsForAdmin = () => {
  return client.get("/admin/locations");
};

export const searchCategories = (params) => {
  return client.get(`/admin/categories/search`,{params});
};

export const createLocation = (params) => {
  return client.post("/admin/locations", params);
};

export const deleteLocation = (location_id) => {
  return client.delete(`/admin/locations/${location_id}`);
};

export const searchLocations = (params) => {
  return client.get(`/admin/locations/search`,{params});
};
