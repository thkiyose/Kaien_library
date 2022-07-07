import { client } from './client';

export const createLending = (params) => {
  return client.post("/lendings",params);
};
