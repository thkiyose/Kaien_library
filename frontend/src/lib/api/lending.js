import { client } from './client';

export const createBook = (params) => {
  return client.post("/lending",params);
};
