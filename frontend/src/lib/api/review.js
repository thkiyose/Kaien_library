import { client } from './client';

export const createReview = (params) => {
  return client.post("/reviews",params);
};

export const showReviews = (book_id, user_id) => {
  return client.get("/reviews",{ params: { book_id: book_id, user_id: user_id } });
};

export const fetchUserReviews = (user_id) => {
  return client.get("/user_reviews",{ params: { user_id: user_id } });
};
