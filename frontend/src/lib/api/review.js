import { client } from './client';

export const createReview = (params) => {
  return client.post("/reviews",params);
};
