import { client } from './client';

export const createReview = (params) => {
  return client.post("/reviews",params);
};

export const showReviews = (params) => {
  return client.get("/reviews",params);
};
