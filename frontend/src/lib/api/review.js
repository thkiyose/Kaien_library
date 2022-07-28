import { client } from './client';

export const createReview = (params) => {
  return client.post("/reviews",params);
};

export const showReviews = (book_id) => {
  return client.get("/reviews",{ params: { id: book_id} });
};
